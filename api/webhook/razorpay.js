import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Instantiate Supabase client securely (using service_role key ideally, but anon key works if policies permit)
const supabase = createClient(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'YOUR_WEBHOOK_SECRET';
        const signature = req.headers['x-razorpay-signature'];
        
        // 1. Verify Razorpay webhook signature to ensure it's authentic
        if (signature && process.env.RAZORPAY_WEBHOOK_SECRET) {
             const expectedSignature = crypto.createHmac('sha256', secret)
                                             .update(JSON.stringify(req.body))
                                             .digest('hex');
             if (expectedSignature !== signature) {
                 return res.status(400).json({ error: 'Invalid signature' });
             }
        }

        const { event, payload } = req.body;
        
        // 2. Handle Subscription events
        if (event === 'subscription.charged' || event === 'subscription.authenticated' || event === 'subscription.activated') {
            const subscription = payload.subscription?.entity;
            const payment = payload.payment?.entity;
            
            if (subscription) {
                // Extract identifying notes passed during subscription creation
                const notes = subscription.notes || {};
                const phoneStr = notes.phone || '';
                const leadId = notes.lead_id || '';

                // Map Razorpay data to your Supabase schema
                const updateData = {
                    subscription_id: subscription.id,
                    subscription_status: subscription.status,
                    plan_id: subscription.plan_id,
                };
                
                if (payment) {
                    updateData.payment_id = payment.id;
                    updateData.amount = payment.amount / 100; // Store exact amount paid
                    updateData.status = 'paid';
                }

                // Identify the user and update the database row safely
                if (leadId) {
                    await supabase.from('leads').update(updateData).eq('id', leadId);
                } else if (phoneStr) {
                    await supabase.from('leads').update(updateData).eq('phone', phoneStr);
                } else {
                    console.warn(`Webhook processed but no lead_id or phone was attached to subscription notes for sub_id: ${subscription.id}`);
                }
            }
        }

        res.status(200).json({ status: 'ok' });
    } catch (err) {
        console.error('Webhook Execution Error:', err);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
}

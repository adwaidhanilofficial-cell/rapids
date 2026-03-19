import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Initialize Razorpay SDK
        // IMPORTANT: Set these variables in your .env or Vercel environment
        const razorpay = new Razorpay({
            key_id: process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_live_SHHmRMqeg5U0Ci',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'qfjEBKB0hiRtuI0BOY2OiZeI',
        });

        // 1. Calculate the UNIX timestamp for exactly 30 days in the future
        const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60;
        const startAt = Math.floor(Date.now() / 1000) + THIRTY_DAYS_IN_SECONDS;

        const { lead_id, phone } = req.body || {};

        // 2. Setup subscription payload
        const subscriptionParams = {
            // Evaluates to actual plan ID created in Razorpay Dashboard
            plan_id: process.env.RAZORPAY_PLAN_ID || 'plan_STAlVsMEU6VYbD',
            total_count: 12, // Number of billing cycles (e.g. 12 months)
            quantity: 1,
            start_at: startAt,       // Starts exactly 30 days later
            customer_notify: 1,      // Let Razorpay send communications
            addons: [
                {
                    item: {
                        name: "Upfront Setup Fee",
                        amount: 500,  // ₹5 in paise structure
                        currency: "INR"
                    }
                }
            ],
            notes: {
                name: req.body?.name || '',
                phone: req.body?.phone || ''
            }
        };

        // 3. Call Razorpay Subscriptions API
        const subscription = await razorpay.subscriptions.create(subscriptionParams);

        // 4. Insert row into Supabase leads table using service role key
        try {
            const fullName = req.body?.name || '';
            const phoneStr = req.body?.phone || '';

            await supabase.from('leads').insert([{
                phone: phoneStr,
                wa_name: fullName,
                phone_id: subscription.id, // Store Razorpay subscription_id here temporarily
                source: "razorpay_subscription",
                first_name: fullName.split(' ')[0]
            }]);
        } catch (dbError) {
            console.error("Supabase insert error (api):", dbError);
        }

        // 5. Return the new subscription details to the frontend
        res.status(200).json({
            subscription_id: subscription.id,
            subscription_details: subscription
        });

    } catch (error) {
        console.error("Error creating Razorpay subscription:", error);
        res.status(500).json({
            error: error.message || 'Internal Server Error',
            details: error
        });
    }
}

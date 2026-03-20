import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error("CRITICAL: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured in environment variables. Aborting initialization.");
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const fullName = req.body?.name || '';
        const phoneStr = req.body?.phone || '';

        // 1. Insert row into Supabase leads table using service role key BEFORE Razorpay
        const { data: insertData, error: dbError } = await supabase.from('leads').insert([{
            phone: phoneStr,
            wa_name: fullName,
            status: 'pending',
            source: "razorpay_subscription",
            first_name: fullName.split(' ')[0]
        }]).select();

        if (dbError) {
            console.error("Supabase insert error (api):", dbError, {
                reqBody: req.body
            });
            throw new Error(`Failed to initialize lead tracking: ${dbError.message}`);
        }

        const leadRecordId = insertData?.[0]?.id;

        // Initialize Razorpay SDK
        // IMPORTANT: Set these variables in your .env or Vercel environment
        const razorpay = new Razorpay({
            key_id: process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_live_SHHmRMqeg5U0Ci',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'qfjEBKB0hiRtuI0BOY2OiZeI',
        });

        // 2. Calculate the UNIX timestamp for exactly 30 days in the future
        const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60;
        const startAt = Math.floor(Date.now() / 1000) + THIRTY_DAYS_IN_SECONDS;

        // 3. Setup subscription payload
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
                name: fullName,
                phone: phoneStr,
                lead_id: leadRecordId
            }
        };

        // 4. Call Razorpay Subscriptions API
        const subscription = await razorpay.subscriptions.create(subscriptionParams);

        // Update the lead with the subscription_id now that we have it
        await supabase.from('leads').update({ subscription_id: subscription.id }).eq('id', leadRecordId);

        // 5. Return the new subscription details to the frontend
        res.status(200).json({
            subscription_id: subscription.id,
            lead_id: leadRecordId
        });

    } catch (error) {
        console.error("Error creating Razorpay subscription:", error);
        res.status(500).json({
            error: error.message || 'Internal Server Error'
        });
    }
}

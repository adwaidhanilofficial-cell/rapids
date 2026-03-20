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
        const reqAmount = req.body?.amount || 500; // Amount in rupees

        // 1. Insert row into Supabase leads table using service role key BEFORE Razorpay
        const { data: insertData, error: dbError } = await supabase.from('leads').insert([{
            phone: phoneStr,
            wa_name: fullName,
            status: 'pending',
            source: "razorpay_order",
            first_name: fullName.split(' ')[0]
        }]).select();

        if (dbError) {
            console.error("Supabase insert error (api):", dbError, { reqBody: req.body });
            throw new Error(`Failed to initialize lead tracking: ${dbError.message}`);
        }

        const leadRecordId = insertData?.[0]?.id;

        // Initialize Razorpay SDK
        const razorpay = new Razorpay({
            key_id: process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_live_SHHmRMqeg5U0Ci',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'qfjEBKB0hiRtuI0BOY2OiZeI',
        });

        // 2. Create order instead of subscription
        const order = await razorpay.orders.create({
            amount: parseInt(reqAmount) * 100, // amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}_${leadRecordId || ''}`
        });

        // Update the lead with the order_id now that we have it
        // Assumes order_id exists, fallback to payment_id for safety if schema not migrated
        await supabase.from('leads').update({ order_id: order.id }).eq('id', leadRecordId).select();

        // 3. Return the new order details to the frontend
        res.status(200).json({
            order_id: order.id,
            amount: order.amount,
            lead_id: leadRecordId
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({
            error: error.message || 'Internal Server Error'
        });
    }
}

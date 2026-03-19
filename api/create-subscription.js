import Razorpay from 'razorpay';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Initialize Razorpay SDK
        // IMPORTANT: Set these variables in your .env or Vercel environment
        const razorpay = new Razorpay({
            key_id: process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'YOUR_KEY_ID',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET',
        });

        // 1. Calculate the UNIX timestamp for exactly 30 days in the future
        const THIRTY_DAYS_IN_SECONDS = 30 * 24 * 60 * 60;
        const startAt = Math.floor(Date.now() / 1000) + THIRTY_DAYS_IN_SECONDS;

        const { lead_id, phone } = req.body || {};

        // 2. Setup subscription payload
        const subscriptionParams = {
            // Must be replaced with the actual plan ID created in Razorpay Dashboard
            plan_id: process.env.RAZORPAY_PLAN_ID || 'plan_YOUR_PLAN_ID',
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
                lead_id: lead_id || '',
                phone: phone || ''
            }
        };

        // 3. Call Razorpay Subscriptions API
        const subscription = await razorpay.subscriptions.create(subscriptionParams);

        // 4. Return the new subscription details to the frontend
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

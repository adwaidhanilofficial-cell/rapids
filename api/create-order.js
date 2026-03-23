const Razorpay = require('razorpay');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, amount } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    // ₹5 for testing (change to 499 for production)
    const orderAmount = amount || 5;

    // Exact env var names from Vercel dashboard
    const keyId = process.env.VITE_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Missing Razorpay credentials:', {
        VITE_RAZORPAY_KEY_ID: !!keyId,
        RAZORPAY_KEY_SECRET: !!keySecret,
      });
      return res.status(500).json({ error: 'Payment service not configured' });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(orderAmount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { name, phone },
    });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (error) {
    console.error('Razorpay order creation failed:', error);
    return res.status(500).json({
      error: error.message || 'Failed to create order',
    });
  }
};

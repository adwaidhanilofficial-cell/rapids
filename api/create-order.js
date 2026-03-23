const Razorpay = require('razorpay');

module.exports = async (req, res) => {
  // Set CORS headers
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

    // Validate required inputs (amount is optional, defaults to 5 for testing)
    if (!name || !phone) {
      return res.status(400).json({ error: 'Missing required fields: name and phone are required' });
    }

    // Use provided amount or default to 5 (₹5 for testing)
    const orderAmount = amount || 5;

    // Use VITE_RAZORPAY_KEY_ID (matches Vercel dashboard), fallback to RAZORPAY_KEY_ID for local dev
    const keyId = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials not configured. VITE_RAZORPAY_KEY_ID:', !!keyId, 'RAZORPAY_KEY_SECRET:', !!keySecret);
      return res.status(500).json({ error: 'Payment service not configured. Please contact support.' });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(orderAmount * 100), // convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { name, phone }
    });

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId // Send key_id so frontend can use it
    });

  } catch (error) {
    console.error('Razorpay order error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to create order' 
    });
  }
};

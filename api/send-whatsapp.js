// Vercel Serverless Function: Send WhatsApp message after payment
// Called by LeadForm.tsx after Razorpay payment success/failure

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { phone, paymentId, amount, name, status } = req.body || {};
    if (!phone) return res.status(400).json({ error: 'Missing phone' });

    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_ID || '104161818385696178';

    if (!WHATSAPP_TOKEN) {
        console.error('WHATSAPP_TOKEN not set in environment');
        return res.status(500).json({ error: 'Server config error' });
    }

    let messageBody;

    if (status === 'paid' || status === 'success') {
        messageBody = {
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text: {
                body: `🎉 *Payment Successful!* 🎉\n\n✅ Your seat is *CONFIRMED* for the Executive Communication Masterclass!\n\nPayment ID: ${paymentId || 'N/A'}\nAmount: ₹${amount || 5}\n\n🚀 *Join our batch WhatsApp group now:*\nhttps://chat.whatsapp.com/LbLq1rzlGPdAuL6fESPyVf\n\nSee you in class! 💪`
            }
        };
    } else if (status === 'failed') {
        messageBody = {
            messaging_product: "whatsapp",
            to: phone,
            type: "text",
            text: {
                body: `⚠️ *Payment didn't go through!*\n\nDon't worry, your seat is still reserved.\n\n🔄 Try again:\nhttps://rapids.in/lead-form?phone=${phone}&name=${encodeURIComponent(name || '')}\n\n💬 If you're facing issues, just reply here!`
            }
        };
    } else {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const response = await fetch(
            `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageBody),
            }
        );

        const data = await response.json();
        console.log('WhatsApp API response:', JSON.stringify(data));

        if (response.ok) {
            return res.status(200).json({ success: true, messageId: data.messages?.[0]?.id });
        } else {
            console.error('WhatsApp API error:', data);
            return res.status(500).json({ error: 'WhatsApp API failed', details: data });
        }
    } catch (err) {
        console.error('Fetch error:', err);
        return res.status(500).json({ error: err.message });
    }
}

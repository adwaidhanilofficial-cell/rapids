
export default function handler(req, res) {
    if (req.method === 'POST') {
        // In a real application, you would verify the signature here
        // const secret = 'YOUR_WEBHOOK_SECRET';
        // const signature = req.headers['x-razorpay-signature'];

        // For now, just log and return 200
        console.log('Payment Verified', req.body);

        res.status(200).json({ status: 'ok' });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

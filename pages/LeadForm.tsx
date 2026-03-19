import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const LeadForm: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneLocked, setPhoneLocked] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Pre-fill from URL params (from WhatsApp link)
    useEffect(() => {
        const urlPhone = searchParams.get('phone') || '';
        const urlName = searchParams.get('name') || '';
        if (urlPhone) {
            // Strip 91 prefix for display (form shows +91 already)
            let displayPhone = urlPhone.replace(/\D/g, '');
            if (displayPhone.startsWith('91') && displayPhone.length > 10) {
                displayPhone = displayPhone.substring(2);
            }
            setPhone(displayPhone);
            setPhoneLocked(true); // Lock the phone field
        }
        if (urlName) setName(decodeURIComponent(urlName));
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!name.trim() || !phone.trim()) {
                throw new Error('Please fill in all fields');
            }
            let formattedPhone = phone.replace(/\D/g, '');
            if (formattedPhone.startsWith('91') && formattedPhone.length > 10) {
                formattedPhone = formattedPhone.substring(2);
            }
            if (formattedPhone.length < 10) {
                throw new Error('Please enter a valid 10-digit phone number');
            }
            const phoneWith91 = '91' + formattedPhone;

            // Frontend cannot insert into Supabase due to RLS, so this will be handled entirely by the backend webhook after successful payment
            const leadId = '';

            // 1. Call custom backend to generate Razorpay subscription
            const subResponse = await fetch('/api/create-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), phone: phoneWith91 })
            });
            const subData = await subResponse.json();

            if (!subResponse.ok || !subData.subscription_id) {
                throw new Error(subData.error || 'Failed to initialize subscription');
            }

            // Launch Razorpay Checkout Dashboard (with UPI apps: GPay, PhonePe, etc.)
            const options = {
                key: "rzp_live_SHHmRMqeg5U0Ci", // Ideally fetch this securely or match with backend key
                subscription_id: subData.subscription_id,
                name: "Rapids Training",
                description: "Pro Membership AutoPay",
                image: "https://bovrapqqwxwemjfpqkqr.supabase.co/storage/v1/object/public/rapids-images/pitch.png",
                handler: async function (response: any) {
                    try {
                        const paymentId = response.razorpay_payment_id;
                        const subscriptionId = response.razorpay_subscription_id;
                        
                        // Supabase state is now updated securely via Webhook
                        
                        // 2. Send WhatsApp confirmation message SAFELY
                        try {
                            const payload = JSON.stringify({
                                phone: phoneWith91,
                                paymentId,
                                amount: 5,
                                name: name.trim(),
                                status: 'paid'
                            });

                            await fetch('/api/send-whatsapp', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: payload
                            });
                        } catch (e) {
                            console.warn("WhatsApp send error:", e);
                        }
                        
                        // 3. Navigate to success page gracefully
                        setError(null);
                        window.location.href = '/thank-you';
                    } catch (handlerErr) {
                        console.error("Critical error inside payment success handler:", handlerErr);
                        window.location.href = '/thank-you'; // Still redirect so they aren't stuck if it already charged
                    }
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: name.trim(),
                    contact: phoneWith91,
                },
                notes: {
                    lead_id: leadId,
                    phone: phoneWith91,
                },
                theme: {
                    color: "#D4AF37",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', async function (response: any) {
                try {
                    console.error("Payment failed", response.error);
                    // Send WhatsApp failed notification
                    try {
                        const payload = JSON.stringify({
                            phone: phoneWith91,
                            name: name.trim(),
                            status: 'failed'
                        });
                        await fetch('/api/send-whatsapp', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: payload
                        });
                    } catch (e) {
                        console.warn("WhatsApp failed msg error:", e);
                    }
                    setError(`Payment issue: ${response?.error?.description || 'Please try again.'}`);
                    setLoading(false);
                } catch (failErr) {
                    console.error("Error in fallback handler:", failErr);
                    setError('An unexpected error occurred during payment. Please try again.');
                    setLoading(false);
                }
            });
            rzp.open();
        } catch (err: any) {
            console.error('Error:', err);
            setError(err.message || 'Failed to save details. Please try again.');
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen dark:bg-black bg-background-light flex flex-col md:justify-center md:items-center md:p-8 transition-colors duration-500"
        >
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none geo-bg hidden md:block"></div>

            {/* Main Container: Full screen on mobile, Card on desktop */}
            <main className="relative z-10 w-full max-w-5xl dark:bg-[#050505] bg-white md:border dark:md:border-white/10 md:border-black/5 md:rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-screen md:min-h-[650px] transition-colors duration-500">

                {/* HERO SECTION / IMAGE */}
                <div className="relative w-full md:w-1/2 h-[220px] md:h-auto shrink-0 overflow-hidden group">
                    <img
                        src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop"
                        alt="Communication Masterclass"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* SMART GRADIENT OVERLAY - just bottom fade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/20 md:to-[#050505]"></div>
                </div>

                {/* FORM SECTION */}
                <div className="relative w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:p-16 dark:bg-[#050505] bg-white -mt-6 md:mt-0 rounded-t-[2.5rem] md:rounded-none z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] md:shadow-none transition-colors duration-500">

                    <div className="mb-10 mt-2 md:mt-0">
                        <h1 className="font-serif text-4xl font-bold tracking-[0.15em] dark:text-white text-gray-900 mb-2 transition-colors">
                            RAPIDS
                        </h1>
                        <p className="text-[11px] tracking-[0.3em] text-primary font-bold uppercase">
                            Secure Your Seat
                        </p>
                    </div>

                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-3">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-4" htmlFor="fullname">Full Name</label>
                            <input
                                className="block w-full px-6 py-5 dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-200 rounded-2xl focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 dark:text-white text-gray-900 placeholder-gray-600 text-base transition-all duration-300 shadow-inner"
                                id="fullname"
                                placeholder="Enter your name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-4" htmlFor="phone">Phone Number {phoneLocked && <span className="text-green-400">✓ Verified</span>}</label>
                            <div className="flex gap-3">
                                <div className="flex items-center justify-center px-5 dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-200 rounded-2xl dark:text-gray-400 text-gray-600 text-sm font-bold shadow-inner">
                                    +91
                                </div>
                                <input
                                    className={`block w-full px-6 py-5 dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-200 rounded-2xl focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 dark:text-white text-gray-900 placeholder-gray-600 text-base transition-all duration-300 shadow-inner ${phoneLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                                    id="phone"
                                    placeholder="98765 43210"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => !phoneLocked && setPhone(e.target.value)}
                                    readOnly={phoneLocked}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs tracking-wide bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-center">{error}</p>}

                        <button className="w-full mt-6 py-5 bg-gold-platinum text-black font-serif font-bold tracking-[0.2em] text-sm uppercase hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)] rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Secure Your Seat'}
                        </button>
                    </form>

                    <div className="mt-auto pt-10 text-center w-full">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                            ALREADY A MEMBER?
                            <button className="font-bold dark:text-gray-300 text-gray-800 hover:text-primary transition-colors ml-2" onClick={() => navigate('/')}>Log In</button>
                        </p>
                    </div>
                </div>
            </main>
        </motion.div>
    );
};
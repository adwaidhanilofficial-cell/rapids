import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useLanguage } from '../src/context/LanguageContext';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const LeadForm: React.FC = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Validate inputs
            if (!name.trim() || !phone.trim()) {
                throw new Error('Please fill in all fields');
            }
            const formattedPhone = phone.replace(/\D/g, '');
            if (formattedPhone.length < 10) {
                throw new Error('Please enter a valid phone number');
            }

            // 2. Insert into Supabase AND return the ID (.select() is crucial here)
            const { data, error: dbError } = await supabase
                .from('leads')
                .insert([
                    {
                        name: name.trim(),
                        phone: formattedPhone,
                        status: 'pending',
                        created_at: new Date().toISOString(),
                    },
                ])
                .select()
                .single();

            if (dbError) throw dbError;
            if (!data) throw new Error('No data returned from database');

            const newLeadId = data.id;

            // 3. Prepare Razorpay Options with the "Secret Note"
            const options = {
                key: "rzp_live_SHHmRMqeg5U0Ci", // LIVE KEY
                amount: 500, // ₹5 in paise
                currency: "INR",
                name: "Rapids Training",
                description: "Seat Booking Fee",
                image: "https://your-logo-url.com/logo.png",
                handler: async function (response: any) {
                    try {
                        const paymentId = response.razorpay_payment_id;

                        // CRITICAL: Update Supabase with 'paid' status AND payment_id
                        const { error: updateError } = await supabase
                            .from('leads')
                            .update({
                                status: 'paid',
                                payment_id: paymentId
                            })
                            .eq('id', newLeadId);

                        if (updateError) {
                            console.error("Error updating payment status:", updateError);
                            alert("Payment successful but failed to update status. Please contact support.");
                            return;
                        }

                        // ONLY redirect after successful update
                        navigate('/success', {
                            state: {
                                name: name,
                                phone: phone,
                                leadId: newLeadId,
                                paymentId: paymentId
                            }
                        });

                    } catch (err) {
                        console.error("Payment handler error:", err);
                        alert("An error occurred after payment. Please contact support.");
                    }
                },
                prefill: {
                    name: name,
                    contact: formattedPhone,
                },
                notes: {
                    lead_id: newLeadId,
                },
                theme: {
                    color: "#D4AF37",
                },
            };

            // 4. Launch Razorpay
            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            console.error('Error inserting lead:', err);
            setError(err.message || 'Failed to save details. Please try again.');
        } finally {
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
                <div className="relative w-full md:w-1/2 h-[50vh] md:h-auto shrink-0 overflow-hidden group">
                    <img
                        src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop"
                        alt="Communication Masterclass"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* SMART GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/20 md:to-[#050505]"></div>

                    {/* Content Overlay */}
                    <div className="absolute top-24 left-6 md:top-12 md:left-12 right-6 z-10">
                        <div className="inline-block px-4 py-1.5 bg-primary text-black text-[11px] font-bold uppercase tracking-widest mb-6 shadow-lg rounded-full">
                            Premium Access
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl text-white leading-[1.1] mb-3 drop-shadow-lg uppercase tracking-tight">
                            Executive <br /> Communication <br /> Masterclass
                        </h2>
                        <p className="text-gray-300 text-xs md:text-sm font-medium drop-shadow-md max-w-xs leading-relaxed">
                            Join the elite circle of communicators. Limited seats available.
                        </p>
                    </div>
                </div>

                {/* FORM SECTION */}
                <div className="relative w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:p-16 dark:bg-[#050505] bg-white -mt-10 md:mt-0 rounded-t-[2.5rem] md:rounded-none z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] md:shadow-none transition-colors duration-500">

                    <div className="mb-10 mt-2 md:mt-0">
                        <h1 className="font-serif text-4xl font-bold tracking-[0.15em] dark:text-white text-gray-900 mb-2 transition-colors">
                            RAPIDS
                        </h1>
                        <p className="text-[11px] tracking-[0.3em] text-primary font-bold uppercase">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`seat-label-${language}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {language === 'ml' ? 'സീറ്റ് ഉറപ്പാക്കൂ' : 'Secure Your Seat'}
                                </motion.span>
                            </AnimatePresence>
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
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest ml-4" htmlFor="phone">Phone Number</label>
                            <div className="flex gap-3">
                                <div className="flex items-center justify-center px-5 dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-200 rounded-2xl dark:text-gray-400 text-gray-600 text-sm font-bold shadow-inner">
                                    +91
                                </div>
                                <input
                                    className="block w-full px-6 py-5 dark:bg-white/5 bg-gray-50 border dark:border-white/5 border-gray-200 rounded-2xl focus:border-primary/50 focus:bg-white/10 focus:ring-1 focus:ring-primary/50 dark:text-white text-gray-900 placeholder-gray-600 text-base transition-all duration-300 shadow-inner"
                                    id="phone"
                                    placeholder="98765 43210"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs tracking-wide bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-center">{error}</p>}

                        <button className="w-full mt-6 py-5 bg-gold-platinum text-black font-serif font-bold tracking-[0.2em] text-sm uppercase hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.2)] rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={loading}>
                            {loading ? 'Processing...' : (language === 'ml' ? 'സീറ്റ് ഉറപ്പാക്കൂ' : 'Secure Your Seat')}
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
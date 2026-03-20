import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, MapPin, Download, Phone, MessageCircle, ShieldAlert, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase-client';
import { jsPDF } from 'jspdf';

// --- QR Placeholder Base64 (Transparent default) ---
// Since we don't have the real image yet used a placeholder or code logic to handle it if missing.
// For now, I'll use a placeholder logic in the PDF generation.

export function Success() {
    const { state } = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const profileFormRef = useRef<HTMLDivElement>(null);

    const paymentId = state?.paymentId || searchParams.get('payment_id');
    const name = state?.name || searchParams.get('name') || '';
    const leadId = state?.leadId || searchParams.get('lead_id') || '';
    const phone = state?.phone || searchParams.get('phone') || '';

    // SECURITY CHECK
    if (!paymentId) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="text-center space-y-6">
                    <ShieldAlert className="w-20 h-20 text-red-500 mx-auto" />
                    <h1 className="text-3xl font-bold text-white">Access Denied</h1>
                    <p className="text-gray-400 max-w-md mx-auto">
                        This page can only be accessed after a successful payment. If you believe this is an error, please contact support.
                    </p>
                    <button
                        onClick={() => navigate('/lead-form')}
                        className="bg-[#D4AF37] text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-all"
                    >
                        Go to Registration
                    </button>
                </div>
            </div>
        );
    }
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    // Pre-fill data if available (optional optimization)
    useEffect(() => {
        // You could fetch existing data here if needed, but usually it's empty for new leads
    }, []);

    const generatePDF = async () => {
        const input = document.getElementById('receipt-template');
        if (!input) {
            console.error("Receipt template not found");
            return;
        }

        try {
            const canvas = await import('html2canvas').then(m => m.default(input, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            }));

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${name || 'Rapids'}_Booking_Receipt.pdf`);

        } catch (err) {
            console.error("Error generating PDF:", err);
            setError("Failed to generate receipt. Please try again.");
        }
    };

    const handleDownloadClick = async () => {
        // PROFILE TRAP LOGIC
        if (!email.trim()) {
            setValidationError("Please add your email to download the receipt.");
            profileFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        await generatePDF();
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setValidationError(null);

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        setLoading(true);
        const { error: updateError } = await supabase
            .from('leads')
            .update({ email: email.trim() })
            .eq('id', leadId);

        if (updateError) {
            console.error("Error updating profile:", updateError);
            setError("Failed to update profile. Please try again.");
        } else {
            setUpdated(true);
        }
        setLoading(false);
    };

    // Current Date/Time for Receipt
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="min-h-screen bg-black text-gray-200 pt-28 pb-12">
            <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8">

                {/* --- HIDDEN RECEIPT TEMPLATE --- */}
                <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                    <div id="receipt-template" className="w-[800px] bg-white text-black font-sans border border-gray-300 relative">

                        {/* 1. Header */}
                        <div className="bg-[#1a1a2e] text-white p-6 flex justify-between items-center h-24">
                            <h1 className="text-2xl font-bold tracking-wider">RAPIDS TRAINING INSTITUTE</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Phone className="w-4 h-4" />
                                <span>Support: +91 8547636465</span>
                            </div>
                        </div>

                        {/* 2. Success Banner */}
                        <div className="bg-[#dcfce7] border-y border-[#22c55e] p-4 flex items-center justify-center gap-3">
                            <div className="bg-[#22c55e] rounded-full p-1">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-[#15803d] text-xl font-bold">Booking Confirmed!</h2>
                        </div>

                        {/* 3. Main Layout */}
                        <div className="flex p-8 gap-8 min-h-[400px]">

                            {/* LEFT SIDE (Details) */}
                            <div className="flex-1 space-y-6 border-r border-dashed border-gray-300 pr-8">

                                {/* Event Info */}
                                <div>
                                    <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">Event</p>
                                    <h3 className="text-2xl font-extrabold text-[#1a1a2e] leading-tight">Executive Communication Masterclass</h3>
                                </div>

                                {/* User Details */}
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase mb-1">Name</p>
                                        <p className="text-lg font-bold">{name}</p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500 text-xs uppercase mb-1">Date & Time</p>
                                        <p className="text-base font-bold">{formattedDate} | {formattedTime}</p>
                                    </div>
                                </div>

                                {/* Price Box */}
                                <div className="mt-6 bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Booking Fee Paid</span>
                                        <span className="text-[#16a34a] font-bold text-lg">Rs. 500</span>
                                    </div>
                                    <div className="w-full h-px bg-gray-200"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Balance Due at Venue</span>
                                        <span className="text-[#dc2626] font-bold text-lg">Rs. 5,000</span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE (QR & ID) */}
                            <div className="w-48 flex flex-col items-center justify-center space-y-6 pt-4">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl opacity-20 blur"></div>
                                    <div className="relative bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                                        <img
                                            src="/google-review-qr.png"
                                            alt="QR Code"
                                            className="w-[100px] h-[100px] object-contain" // Fixed width as requested
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                // Optional: Show fallback text if image fails
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="text-center w-full">
                                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Booking ID</p>
                                    <p className="text-xl font-bold text-[#1a1a2e] break-all">{paymentId || '---'}</p>
                                </div>

                                <div className="text-center">
                                    <p className="text-[10px] text-gray-400">Scan to allow us to serve you better</p>
                                </div>
                            </div>
                        </div>

                        {/* 4. Footer */}
                        <div className="bg-gray-50 p-4 text-center border-t border-gray-200 text-xs text-gray-500">
                            <p>Thank you for choosing Rapids Training Institute. Please present this receipt at the venue.</p>
                            <p className="mt-1 text-gray-400">Generated on {formattedDate} at {formattedTime}</p>
                        </div>
                    </div>
                </div>

                {/* CERTIFICATE CARD */}
                <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-2xl p-8 text-center relative overflow-hidden">
                    {/* Glossy effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                        <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                        <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.3em] glow-text">Booking Confirmed</h2>
                    </div>

                    <h2 className="text-3xl text-white mb-2 font-bold font-serif tracking-wide">{name}</h2>
                    <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest">Executive Communication Masterclass</p>

                    {/* Payment Summary */}
                    <div className="bg-red-900/10 border border-red-500/20 p-6 mb-8 rounded-xl inline-block text-left w-full max-w-md">
                        <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Booking Fee Paid</span>
                            <span className="text-green-400 font-bold font-mono">₹500.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Balance Due</span>
                            <span className="text-red-500 font-bold font-mono">₹5,000.00</span>
                        </div>
                        <p className="text-[10px] text-red-400 mt-2 text-center italic">* Balance to be paid at the venue</p>
                    </div>

                    <br />

                    <div className="space-y-4">
                        <button
                            onClick={handleDownloadClick}
                            className="bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] text-black font-bold px-10 py-4 rounded-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                        >
                            <Download className="w-5 h-5" />
                            Download Official Receipt
                        </button>

                        {validationError && (
                            <p className="text-red-400 text-sm flex items-center justify-center gap-2 animate-pulse">
                                <AlertTriangle className="w-4 h-4" />
                                {validationError}
                            </p>
                        )}
                    </div>

                    {paymentId && (
                        <p className="mt-6 text-[10px] text-gray-600 font-mono tracking-widest">ID: {paymentId}</p>
                    )}
                </div>

                {/* PROFILE SECTION (TRAP) */}
                <div ref={profileFormRef} className={`transition-all duration-500 ${validationError ? 'ring-2 ring-red-500 scale-[1.01]' : 'border border-white/10'} bg-neutral-900/50 p-8 rounded-2xl`}>
                    <h3 className="text-2xl font-bold text-white mb-2 font-serif">Complete Your Profile</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Please add your email to generate your official receipt.
                        <span className="text-red-400 ml-1">* Required</span>
                    </p>

                    {updated ? (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center animate-fade-in">
                            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                            <p className="text-green-400 font-bold text-lg">Profile Updated!</p>
                            <p className="text-gray-400 text-xs mt-1">You can now download your receipt.</p>
                            <button
                                onClick={generatePDF}
                                className="mt-4 text-[#D4AF37] hover:underline text-sm font-bold"
                            >
                                Click here if download didn't start
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email <span className="text-red-500">*</span></label>
                                <input
                                    placeholder="your@email.com"
                                    type="email"
                                    className="w-full bg-black border border-white/20 p-4 rounded-xl text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-700"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded border border-red-500/20">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black font-bold text-sm tracking-widest uppercase p-4 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 mt-4"
                            >
                                {loading ? 'Saving Details...' : 'Save & Enable Download'}
                            </button>
                        </form>
                    )}
                </div>

                {/* CONTACT & MAP */}
                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-2">Need Help?</h3>
                        <a
                            href="tel:+918547636465"
                            className="flex items-center gap-3 bg-white/5 p-4 rounded-xl text-center font-bold text-white hover:bg-white/10 transition-all border border-white/5 group"
                        >
                            <Phone className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                            Call Support
                        </a>
                        <a
                            href="https://wa.me/918547636465"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-[#25D366]/10 text-[#25D366] p-4 rounded-xl text-center font-bold hover:bg-[#25D366]/20 transition-all border border-[#25D366]/20 group"
                        >
                            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            WhatsApp Support
                        </a>
                    </div>
                    <div className="h-64 bg-neutral-800 rounded-xl overflow-hidden relative border border-white/10">
                        <iframe
                            title="Rapids Training Institute Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.375624795493!2d76.07172557408226!3d10.648171162468315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba795dfc37f374d%3A0x6335443d52673236!2sPrivate%20Bus%20Stand%2C%20Kunnamkulam!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-black/90 px-4 py-2 rounded text-white text-xs flex items-center gap-2 border border-white/10">
                            <MapPin className="w-3 h-3 text-[#D4AF37]" />
                            Kunnamkulam Bus Stand
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Download, Phone, MessageCircle, ShieldAlert } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { jsPDF } from 'jspdf';

export function Success() {
    const { state } = useLocation();
    const navigate = useNavigate();

    // SECURITY CHECK
    if (!state || !state.paymentId) {
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

    const { name, leadId, paymentId } = state;
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);

    const downloadCertificate = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Dark Background
        doc.setFillColor(20, 20, 20);
        doc.rect(0, 0, 297, 210, 'F');

        // Gold Border
        doc.setDrawColor(212, 175, 55);
        doc.setLineWidth(3);
        doc.rect(10, 10, 277, 190);

        // Header
        doc.setTextColor(212, 175, 55);
        doc.setFontSize(22);
        doc.text("RAPIDS TRAINING INSTITUTE", 148.5, 40, { align: "center" });

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text("OFFICIAL BOOKING CONFIRMATION", 148.5, 55, { align: "center" });

        // Name
        doc.setFontSize(40);
        doc.setTextColor(212, 175, 55);
        doc.text(name, 148.5, 95, { align: "center" });

        // Body
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.text("Has secured a seat for the Executive Communication Masterclass", 148.5, 115, { align: "center" });

        // Footer Details
        const today = new Date();
        const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear().toString().slice(-2)}`;

        doc.setFontSize(12);
        doc.text(`Payment ID: ${paymentId}`, 20, 180);
        doc.text(`Date: ${dateString}`, 277, 180, { align: "right" });

        // Save with custom filename
        doc.save(`${name} ${dateString}.pdf`);
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await supabase.from('leads').update({ city, district, email }).eq('id', leadId);
        setUpdated(true);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-gray-200 pt-28 pb-12">
            <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8">

                {/* CERTIFICATE CARD */}
                <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-2xl p-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                        <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.3em]">Booking Confirmed</h2>
                    </div>

                    <h2 className="text-3xl text-white mb-2 font-bold">{name}</h2>
                    <p className="text-gray-400 text-sm mb-6">Executive Communication Masterclass</p>

                    {/* Payment Summary */}
                    <div className="bg-red-900/20 border border-red-500/30 p-4 mb-6 rounded-lg inline-block text-left">
                        <p className="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Payment Summary</p>
                        <p className="text-green-400 font-semibold">✓ Booking Fee Paid: ₹500</p>
                        <p className="text-red-500 font-bold mt-1">⚠ Balance Due at Venue: ₹5,000</p>
                    </div>

                    <br />

                    <button
                        onClick={downloadCertificate}
                        className="bg-[#D4AF37] text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-all inline-flex items-center gap-2"
                    >
                        <Download className="w-5 h-5" /> Download Receipt
                    </button>

                    {paymentId && (
                        <p className="mt-4 text-xs text-gray-600 font-mono">Payment ID: {paymentId}</p>
                    )}
                </div>

                {/* PROFILE SECTION */}
                <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-4">Complete Your Profile</h3>
                    <p className="text-gray-500 text-sm mb-6">Help us personalize your experience by providing additional details.</p>

                    {updated ? (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
                            <p className="text-green-400 font-semibold">Profile Updated Successfully!</p>
                        </div>
                    ) : (
                        <form onSubmit={handleUpdateProfile} className="grid md:grid-cols-3 gap-4">
                            <input
                                placeholder="City"
                                className="bg-black border border-white/20 p-3 rounded text-white focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 outline-none transition-all"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                            <input
                                placeholder="District"
                                className="bg-black border border-white/20 p-3 rounded text-white focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 outline-none transition-all"
                                value={district}
                                onChange={e => setDistrict(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-white text-black font-bold p-3 rounded hover:bg-gray-200 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Update'}
                            </button>
                        </form>
                    )}
                </div>

                {/* CONTACT & MAP */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-2">Need Help?</h3>
                        <a
                            href="tel:+918547636465"
                            className="flex items-center gap-3 bg-white/10 p-4 rounded-xl text-center font-bold text-white hover:bg-white/15 transition-all"
                        >
                            <Phone className="w-5 h-5 text-[#D4AF37]" />
                            Call Support
                        </a>
                        <a
                            href="https://wa.me/918547636465"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-[#25D366]/20 text-[#25D366] p-4 rounded-xl text-center font-bold hover:bg-[#25D366]/30 transition-all"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp Support
                        </a>
                    </div>
                    <div className="h-64 bg-neutral-800 rounded-xl overflow-hidden relative">
                        <iframe
                            title="Rapids Training Institute Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.375624795493!2d76.07172557408226!3d10.648171162468315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba795dfc37f374d%3A0x6335443d52673236!2sPrivate%20Bus%20Stand%2C%20Kunnamkulam!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded text-white text-sm flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#D4AF37]" />
                            Kunnamkulam Bus Stand
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

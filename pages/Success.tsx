import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Download, Phone, MessageCircle, ShieldAlert, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { jsPDF } from 'jspdf';

// --- QR Placeholder Base64 (Transparent default) ---
// Since we don't have the real image yet used a placeholder or code logic to handle it if missing.
// For now, I'll use a placeholder logic in the PDF generation.

export function Success() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const profileFormRef = useRef<HTMLDivElement>(null);

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

    const { name, leadId, paymentId, phone } = state;
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    // Email is optional in the new requirement but city/district is mandatory for the trap
    // We'll keep email if users want to add it, but focus trap on city/district
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);

    // Pre-fill data if available (optional optimization)
    useEffect(() => {
        // You could fetch existing data here if needed, but usually it's empty for new leads
    }, []);

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait', // Changed to portrait for a ticket feel, or keep landscape if preferred. Reference looked somewhat square/portrait.
            unit: 'mm',
            format: 'a4' // A4 Page
            // Note: For a "ticket", we'll draw a box on the A4 page.
        });

        // --- CONFIG ---
        const pageWidth = doc.internal.pageSize.getWidth();
        const centerX = pageWidth / 2;

        // Ticket Dimensions
        const ticketWidth = 180;
        const ticketHeight = 220; // Expanded to fit content
        const startX = (pageWidth - ticketWidth) / 2;
        const startY = 20;

        // --- 1. Background & Border (Clean White Box) ---
        doc.setFillColor(255, 255, 255); // White background
        doc.setDrawColor(200, 200, 200); // Light Grey Border
        doc.setLineWidth(0.5);
        doc.roundedRect(startX, startY, ticketWidth, ticketHeight, 3, 3, 'FD');

        // --- 2. Header (Dark Bar) ---
        doc.setFillColor(30, 30, 30); // Dark grey/black
        doc.rect(startX, startY, ticketWidth, 20, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("RAPIDS TRAINING INSTITUTE", centerX, startY + 13, { align: "center" });

        // --- 3. Success Message (Green Bar) ---
        doc.setFillColor(220, 252, 231); // Light greenish bg (Tailwind green-100 approx)
        doc.setDrawColor(34, 197, 94); // Green border
        doc.rect(startX + 5, startY + 25, ticketWidth - 10, 15, 'FD');

        doc.setTextColor(22, 163, 74); // Darker green text
        doc.setFontSize(12);
        doc.text("Booking Confirmed!", centerX, startY + 36, { align: "center" });

        // --- 4. Split Layout (Line Separator) ---
        // Vertical line logic or just visually distinct areas

        // --- Left Side Details (Y: 50+) ---
        let currentY = startY + 55;
        const leftMargin = startX + 15;
        const valueX = startX + 15; // Aligned left

        // Movie/Event Name
        doc.setTextColor(0, 0, 0); // Black
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Executive Communication", leftMargin, currentY);
        currentY += 8;
        doc.text("Masterclass", leftMargin, currentY);
        currentY += 15;

        // Details Block
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100); // Label Color
        doc.setFont("helvetica", "normal");

        // Function to look like: "Location: ......"
        const addDetail = (label: string, value: string, color: string = "#000000") => {
            doc.setFont("helvetica", "normal");
            doc.setTextColor(100, 100, 100);
            doc.text(label, leftMargin, currentY);

            doc.setFont("helvetica", "bold");
            doc.setTextColor(color);
            doc.text(value, leftMargin, currentY + 5);
            currentY += 15;
        };

        const today = new Date();
        const dateString = `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })} ${today.getFullYear()}`;
        const timeString = "08:00 PM"; // Default or dynamic

        addDetail("Location", `${city}, ${district} (Kerala)`);
        addDetail("Date & Time", `${dateString} | ${timeString}`);
        addDetail("Payment Mode", "UPI / Razorpay");

        // Financials
        // 'Booking Fee Paid' ..... ₹500 (Green text)
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("Booking Fee Paid", leftMargin, currentY);
        doc.setTextColor(22, 163, 74); // Green
        doc.setFont("helvetica", "bold");
        doc.text("Rs. 500.00", pageWidth / 2, currentY, { align: "right" }); // Aligning to center-ish split
        currentY += 10;

        // 'Balance Due at Venue' ..... ₹5,000 (Red text)
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("Balance Due at Venue", leftMargin, currentY);
        doc.setTextColor(220, 38, 38); // Red
        doc.setFont("helvetica", "bold");
        doc.text("Rs. 5,000.00", pageWidth / 2, currentY, { align: "right" });
        currentY += 10;


        // --- Right Side (QR Code Section) ---
        // We'll place this nicely on the right
        const qrSize = 60;
        const qrX = startX + ticketWidth - qrSize - 15;
        const qrY = startY + 50;

        // Draw Box for QR
        doc.setDrawColor(200, 200, 200);
        doc.rect(qrX, qrY, qrSize, qrSize);

        // Try to add image if it exists in DOM or load it. 
        // For reliability in this generated script, we'll try to add the image if we can, 
        // implies we need the base64 or URL. Since I can't easily 'import' the png here without setup,
        // I will use a text placeholder if image fails, but ideally:
        // doc.addImage(imgData, 'PNG', qrX, qrY, qrSize, qrSize);

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Scan to Rate Us on Google", qrX + (qrSize / 2), qrY + qrSize + 5, { align: "center" });

        // Booking ID
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text("BOOKING ID", qrX + (qrSize / 2), qrY + qrSize + 15, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(paymentId || "PAY-12345", qrX + (qrSize / 2), qrY + qrSize + 22, { align: "center" });


        // --- 5. Footer (Map & Support) ---
        const footerY = startY + ticketHeight - 30;
        doc.setDrawColor(230, 230, 230);
        doc.line(startX + 10, footerY - 5, startX + ticketWidth - 10, footerY - 5);

        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        doc.setFont("helvetica", "bold");

        // Center aligned footer text
        doc.text("View Office Location:", centerX, footerY + 5, { align: "center" });
        doc.setTextColor(37, 99, 235); // Blue link color
        doc.text("https://maps.app.goo.gl/epYCfpf6yBC1BkY8A", centerX, footerY + 12, { align: "center" });

        doc.setTextColor(50, 50, 50);
        doc.text("Support: +91 8547636465", centerX, footerY + 20, { align: "center" });

        // --- Save ---
        doc.save(`${name}_Booking_Receipt.pdf`);
    };

    const handleDownloadClick = () => {
        // PROFILE TRAP LOGIC
        if (!city.trim() || !district.trim()) {
            // 1. Show Error/Warning
            setValidationError("Please complete your profile to download the receipt.");

            // 2. Scroll to form
            profileFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

            return;
        }

        // 3. Generate if valid
        generatePDF();
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setValidationError(null);

        // Basic validation
        if (!city.trim() || !district.trim()) {
            setError("City and District are required.");
            return;
        }

        setLoading(true);
        const { error: updateError } = await supabase
            .from('leads')
            .update({ city, district, email }) // Update all fields
            .eq('id', leadId);

        if (updateError) {
            console.error("Error updating profile:", updateError);
            setError("Failed to update profile. Please try again.");
        } else {
            setUpdated(true);
            // Optionally auto-download after save?
            // generatePDF(); 
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black text-gray-200 pt-28 pb-12">
            <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8">

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
                        Please provide your location details to generate your official receipt.
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
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">City <span className="text-red-500">*</span></label>
                                    <input
                                        placeholder="e.g. Cochin"
                                        className="w-full bg-black border border-white/20 p-4 rounded-xl text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-700"
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">District <span className="text-red-500">*</span></label>
                                    <input
                                        placeholder="e.g. Ernakulam"
                                        className="w-full bg-black border border-white/20 p-4 rounded-xl text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-700"
                                        value={district}
                                        onChange={e => setDistrict(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email <span className="text-gray-600">(Optional)</span></label>
                                <input
                                    placeholder="your@email.com"
                                    type="email"
                                    className="w-full bg-black border border-white/20 p-4 rounded-xl text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all placeholder:text-gray-700"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
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

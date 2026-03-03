import React, { useEffect, useState } from 'react';

export const BookRedirect: React.FC = () => {
    const [showManual, setShowManual] = useState(false);
    const targetUrl = 'https://rapids.in/lead-form';

    useEffect(() => {
        const ua = navigator.userAgent || '';
        const isWhatsApp = /WhatsApp/i.test(ua);
        const isAndroid = /Android/i.test(ua);
        const isIOS = /iPhone|iPad|iPod/i.test(ua);

        if (isWhatsApp || /FBAN|FBAV|Instagram|Line|Snapchat/i.test(ua)) {
            // In-app browser detected — force external browser
            if (isAndroid) {
                // Android: use intent to open Chrome
                window.location.href = `intent://${targetUrl.replace('https://', '')}#Intent;scheme=https;package=com.android.chrome;end`;
                // Fallback: try generic external browser
                setTimeout(() => {
                    window.location.href = `intent://${targetUrl.replace('https://', '')}#Intent;scheme=https;action=android.intent.action.VIEW;end`;
                }, 300);
            } else if (isIOS) {
                // iOS: try to open in Safari using googlechrome:// or x-safari-https://
                window.location.href = targetUrl;
            }
            // Show manual button as fallback after 1.5s
            setTimeout(() => setShowManual(true), 1500);
        } else {
            // Already in external browser — just redirect
            window.location.href = targetUrl;
        }
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="text-center space-y-8 max-w-md">
                <div className="animate-spin w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full mx-auto"></div>
                <h1 className="text-2xl font-serif font-bold text-white tracking-wide">
                    Opening Rapids...
                </h1>
                <p className="text-gray-400 text-sm">
                    Redirecting you to the booking page in your browser.
                </p>

                {showManual && (
                    <div className="space-y-4 animate-fade-in">
                        <p className="text-yellow-400 text-sm font-bold">
                            ⚠️ If it didn't open automatically:
                        </p>
                        <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full bg-gradient-to-r from-[#D4AF37] to-[#F2D06B] text-black font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
                        >
                            🎟️ Open Booking Page
                        </a>
                        <p className="text-gray-600 text-xs">
                            Tap the ⋮ menu (top right) → "Open in Chrome"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

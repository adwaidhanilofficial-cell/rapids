
import React from 'react';
import { Link } from 'react-router-dom';

export const Success: React.FC = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4">
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/30">
                <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
            </div>
            <h1 className="text-4xl font-serif text-white mb-4">Payment Successful!</h1>
            <p className="text-gray-400 mb-8 max-w-md">
                Welcome to Rapids. Your seat has been secured. We will contact you shortly with further details.
            </p>
            <Link
                to="/"
                className="px-8 py-3 bg-white text-black font-serif font-bold tracking-widest text-sm uppercase hover:bg-gray-200 transition-colors rounded-full"
            >
                Return Home
            </Link>
        </div>
    );
};

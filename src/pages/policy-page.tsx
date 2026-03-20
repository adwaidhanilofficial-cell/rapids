import React from 'react';
import { motion } from 'framer-motion';

export const Policy: React.FC = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="pt-24 px-6 pb-24 min-h-screen bg-background-dark max-w-4xl mx-auto"
        >
            <h1 className="font-serif text-3xl text-white mb-8 border-b border-white/10 pb-4">Policies & Terms</h1>
            
            <div className="space-y-12 text-gray-300 leading-relaxed">
                <section>
                    <h2 className="text-xl text-primary font-bold mb-4">1. Privacy Policy</h2>
                    <p>We collect your name and phone number strictly for course enrollment and verification purposes. We do not sell your data to third parties. Your information is stored securely and used only for communication regarding Rapids Training programs.</p>
                </section>

                <section>
                    <h2 className="text-xl text-primary font-bold mb-4">2. Terms & Conditions</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>The course "Communication Skills" is an offline classroom program. Attendance at the Kunnamkulam center is mandatory.</li>
                        <li>Booking fees are non-transferable to other persons.</li>
                        <li>Students must adhere to the code of conduct within the facility.</li>
                        <li>Rapids Training reserves the right to modify the schedule with prior notice.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl text-primary font-bold mb-4">3. Refund Policy</h2>
                    <p>
                        <strong>Booking Fee (₹500):</strong> This fee is non-refundable as it reserves your limited seat in the batch.<br/><br/>
                        <strong>Total Course Fee:</strong> Refunds for the full payment are only considered if requested 7 days prior to the batch start date. Once the batch commences, no refunds will be issued.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl text-primary font-bold mb-4">4. Data Usage</h2>
                    <p>Your OTP verification log and phone number are retained for security audits and to prevent spam submissions. We use industry-standard encryption for data storage.</p>
                </section>
            </div>
        </motion.div>
    );
};
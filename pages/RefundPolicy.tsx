import React from 'react';
import { motion } from 'framer-motion';

export function RefundPolicy() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-gray-200 font-sans selection:bg-yellow-500/30 py-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block mb-4 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-semibold tracking-widest uppercase">
                        Legal
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                        Refund Implementation Policy
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                        <p className="lead text-xl text-gray-300">
                            At Rapids Training Institutes, we are committed to providing elite communication training. We understand that sometimes plans change, or our training might not be the right fit for everyone. Our refund policy is designed to be transparent, fair, and compliant with Indian consumer protection standards.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">1. The 15-Day Satisfaction Guarantee</h3>
                        <p>
                            We stand behind the quality of our training. We offer a comprehensive <strong>15-Day Money-Back Guarantee</strong>. This window commences strictly from the <strong>Class Start Date</strong>, not the booking date. If you find the training unsatisfactory within the first 15 days of your batch, you are eligible to request a refund of the Course Fee.
                        </p>
                        <p>
                            To initiate a refund under this guarantee, you must send a formal request to <span className="text-yellow-500">support@rapids.in</span> within the 15-day period. Requests received after the 15th day will not be entertained under any circumstances.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">2. Fee Structure & Refund Eligibility</h3>
                        <p>
                            To ensure transparency, our total fee is split into two distinct components. Each component has different refund rules attached to it. Please review the table below carefully.
                        </p>

                        <div className="my-8 overflow-x-auto">
                            <table className="w-full text-left border-collapse border border-white/10">
                                <thead>
                                    <tr className="bg-white/5">
                                        <th className="p-4 border border-white/10 text-white font-semibold">Fee Component</th>
                                        <th className="p-4 border border-white/10 text-white font-semibold">Amount (INR)</th>
                                        <th className="p-4 border border-white/10 text-white font-semibold">Refund Status</th>
                                        <th className="p-4 border border-white/10 text-white font-semibold">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="p-4 border border-white/10 text-white">Booking Fee</td>
                                        <td className="p-4 border border-white/10">₹500</td>
                                        <td className="p-4 border border-white/10 text-red-400 font-bold">Non-Refundable</td>
                                        <td className="p-4 border border-white/10 text-sm">Covers seat reservation, administrative setup, and backend processing.</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4 border border-white/10 text-white">Course Fee</td>
                                        <td className="p-4 border border-white/10">₹5,000</td>
                                        <td className="p-4 border border-white/10 text-green-400 font-bold">Refundable</td>
                                        <td className="p-4 border border-white/10 text-sm">The core tuition fee for the training program. Refundable within the 15-day window.</td>
                                    </tr>
                                    <tr className="bg-white/5 font-bold">
                                        <td className="p-4 border border-white/10 text-white">Total</td>
                                        <td className="p-4 border border-white/10">₹5,500</td>
                                        <td className="p-4 border border-white/10 text-yellow-500">Partial Refund</td>
                                        <td className="p-4 border border-white/10 text-sm">Maximum possible refund is ₹5,000.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">3. Institute-Initiated Cancellations</h3>
                        <p>
                            In the rare event that Rapids Training Institutes cancels a batch or workshop due to unforeseen circumstances, instructor unavailability, or technical issues, we will issue a <strong>100% Refund</strong>.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>This includes both the Booking Fee (₹500) and the Course Fee (₹5,000).</li>
                            <li>No deduction of any kind will be made.</li>
                            <li>The refund will be processed automatically without the student needing to file a request.</li>
                        </ul>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">4. Refund Processing Timeline</h3>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <p className="mb-4">
                                Once a refund request is approved by our finance team, the following timeline applies:
                            </p>
                            <ul className="list-none space-y-4">
                                <li className="flex items-start">
                                    <span className="material-icons-round text-yellow-500 mr-3 mt-1">check_circle</span>
                                    <span><strong>Approval:</strong> You will receive an email confirmation within 24 hours of your request.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-yellow-500 mr-3 mt-1">schedule</span>
                                    <span><strong>Processing:</strong> The bank transfer is initiated immediately upon approval.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="material-icons-round text-yellow-500 mr-3 mt-1">account_balance</span>
                                    <span><strong>Credit:</strong> The amount will reflect in your <strong>original payment source</strong> within <strong>5-7 business days</strong>, depending on your bank's processing speed.</span>
                                </li>
                            </ul>
                        </div>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">5. Non-Refundable Scenarios</h3>
                        <p>
                            Refunds will <strong>NOT</strong> be processed in the following scenarios:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Request made after the 15-day window has expired.</li>
                            <li>Student expulson due to violation of our Terms and Conditions (e.g., recording sessions, misconduct).</li>
                            <li>Failure to attend classes without prior implementation of the Transfer Policy.</li>
                        </ul>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">Contact Us</h3>
                        <p>
                            If you have any questions regarding this policy or need to check the status of a refund, please contact our support team.
                        </p>
                        <p className="font-bold text-white">
                            Email: <span className="text-yellow-500">support@rapids.in</span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

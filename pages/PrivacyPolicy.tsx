import React from 'react';
import { motion } from 'framer-motion';

export function PrivacyPolicy() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-gray-200 font-sans selection:bg-yellow-500/30 py-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block mb-4 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-semibold tracking-widest uppercase">
                        Data Protection
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                        Privacy Policy
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                        <p className="lead text-xl text-gray-300">
                            Rapids Training Institutes ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our courses. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">1. Information We Collect</h3>
                        <p>
                            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                        </p>

                        <h4 className="text-white font-bold mt-6 mb-2">Personal Data</h4>
                        <p>
                            Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
                        </p>

                        <h4 className="text-white font-bold mt-6 mb-2">Derivative Data</h4>
                        <p>
                            Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                        </p>

                        <h4 className="text-white font-bold mt-6 mb-2">Financial Data</h4>
                        <p>
                            Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Razorpay, which is PCI-DSS compliant.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">2. Use of Your Information</h3>
                        <p>
                            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Create and manage your account.</li>
                            <li>Process your payments and refunds.</li>
                            <li>Send you a confirmation email when you register or make a purchase.</li>
                            <li>Communicate with you regarding your account or order.</li>
                            <li>Send you newsletters, marketing communications, and other information regarding our services.</li>
                            <li>Respond to your specialized service requests and support needs.</li>
                            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                        </ul>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">3. Disclosure of Your Information</h3>
                        <p>
                            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                        </p>

                        <h4 className="text-white font-bold mt-6 mb-2">By Law or to Protect Rights</h4>
                        <p>
                            If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                        </p>

                        <h4 className="text-white font-bold mt-6 mb-2">Third-Party Service Providers</h4>
                        <p>
                            We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">4. Security of Your Information</h3>
                        <p>
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">5. Policy for Children</h3>
                        <p>
                            We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">6. Contact Us</h3>
                        <p>
                            If you have questions or comments about this Privacy Policy, please contact us at:
                        </p>
                        <p className="font-bold text-white">
                            Email: <span className="text-yellow-500">support@rapids.in</span><br />
                            Phone: +91-974-755-9900<br />
                            Address: Rapids Training Institutes, C Shape Building, Kunnamkulam, Kerala 680503.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

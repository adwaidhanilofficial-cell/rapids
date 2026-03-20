import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    useEffect(() => { window.scrollTo(0,0); }, []);
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="pt-32 px-6 pb-24 min-h-screen bg-background-dark max-w-4xl mx-auto"
        >
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-8 border-b border-white/10 pb-6">{title}</h1>
            <div className="space-y-8 text-gray-300 leading-relaxed font-light">
                {children}
            </div>
        </motion.div>
    );
};

export const PrivacyPolicy: React.FC = () => (
    <LegalLayout title="Privacy Policy">
        <section>
            <p className="mb-4">At Rapids Training Institutes, we are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.</p>
            
            <h3 className="text-primary font-bold text-lg mt-6 mb-2">1. Information We Collect</h3>
            <p>We collect personal information that you voluntarily provide to us when you register for our courses or express interest in our services. This includes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                <li>Full Name</li>
                <li>Phone Number</li>
                <li>Email Address</li>
            </ul>

            <h3 className="text-primary font-bold text-lg mt-6 mb-2">2. How We Use Your Information</h3>
            <p>We use your data for the following specific purposes:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
                <li>To process your enrollment and verify your identity via OTP.</li>
                <li>To communicate course schedules, updates, and materials.</li>
                <li>To provide customer support and resolve queries.</li>
            </ul>

            <h3 className="text-primary font-bold text-lg mt-6 mb-2">3. Data Security</h3>
            <p>We implement industry-standard security measures to protect your data. We do not sell, trade, or rent your personal identification information to others.</p>

            <h3 className="text-primary font-bold text-lg mt-6 mb-2">4. Contact Us</h3>
            <p>If you have questions regarding this privacy policy, please contact us at <span className="text-white">rapidslearning@gmail.com</span>.</p>
        </section>
    </LegalLayout>
);

export const TermsAndConditions: React.FC = () => (
    <LegalLayout title="Terms and Conditions">
        <section>
            <p className="mb-4">Welcome to Rapids Training Institutes. By accessing our website and enrolling in our courses, you agree to be bound by the following terms and conditions.</p>

            <h3 className="text-primary font-bold text-lg mt-6 mb-2">1. Course Enrollment</h3>
            <p>Enrollment is subject to seat availability. The booking fee is required to reserve your spot in the offline batch at our Kunnamkulam facility.</p>

            <h3 className="text-primary font-bold text-lg mt-6 mb-2">2. Code of Conduct</h3>
            <p>Students are expected to maintain professional behavior within the campus. Any form of harassment or disruption will result in immediate termination of enrollment without refund.</p>

            <h3 className="text-primary font-bold text-lg mt-6 mb-2">3. Intellectual Property</h3>
            <p>All course materials provided are the intellectual property of Rapids Training Institutes. Unauthorized reproduction or distribution is prohibited.</p>

            <h3 className="text-primary font-bold text-lg mt-6 mb-2">4. Jurisdiction</h3>
            <p className="border-l-4 border-primary pl-4 py-2 bg-white/5">
                <strong>Governing Law:</strong> These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the <strong>Courts of Kunnamkulam, Kerala</strong>.
            </p>
        </section>
    </LegalLayout>
);

export const RefundPolicy: React.FC = () => (
    <LegalLayout title="Cancellation & Refund Policy">
        <section>
            <p className="mb-6">We strive to provide the best training experience. However, we understand that circumstances may change. Please review our policy below.</p>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-white/10 mb-8">
                    <thead>
                        <tr className="bg-white/5">
                            <th className="p-4 border border-white/10 text-primary uppercase text-xs font-bold tracking-wider">Policy</th>
                            <th className="p-4 border border-white/10 text-primary uppercase text-xs font-bold tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr>
                            <td className="p-4 border border-white/10 font-bold">Cancellation Deadline</td>
                            <td className="p-4 border border-white/10">Requests must be made at least <strong>48 Hours</strong> before the batch start date.</td>
                        </tr>
                        <tr>
                            <td className="p-4 border border-white/10 font-bold">Refund Processing Time</td>
                            <td className="p-4 border border-white/10">5-7 Business Days</td>
                        </tr>
                        <tr>
                            <td className="p-4 border border-white/10 font-bold">Refund Mode</td>
                            <td className="p-4 border border-white/10">Credited back to the Original Payment Source (Bank/Card/UPI).</td>
                        </tr>
                        <tr>
                            <td className="p-4 border border-white/10 font-bold">Booking Fee</td>
                            <td className="p-4 border border-white/10">Non-refundable if cancelled within 48 hours of batch start.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <p className="text-sm text-gray-500">To initiate a cancellation, please email us at rapidslearning@gmail.com with your enrollment ID.</p>
        </section>
    </LegalLayout>
);

export const ShippingPolicy: React.FC = () => (
    <LegalLayout title="Shipping & Delivery Policy">
        <section>
            <p className="mb-6 text-xl">Rapids Training Institutes provides educational services. We do not ship physical products.</p>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-white/10">
                     <thead>
                        <tr className="bg-white/5">
                            <th className="p-4 border border-white/10 text-primary uppercase text-xs font-bold tracking-wider">Category</th>
                            <th className="p-4 border border-white/10 text-primary uppercase text-xs font-bold tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr>
                            <td className="p-4 border border-white/10 font-bold">Service Type</td>
                            <td className="p-4 border border-white/10">Offline Classroom Training / Educational Services</td>
                        </tr>
                        <tr>
                            <td className="p-4 border border-white/10 font-bold">Shipping Cost</td>
                            <td className="p-4 border border-white/10">₹0 (Not Applicable)</td>
                        </tr>
                        <tr>
                            <td className="p-4 border border-white/10 font-bold">Delivery Mode</td>
                            <td className="p-4 border border-white/10">Services are delivered In-Person at our Kunnamkulam facility or via Online Digital Access.</td>
                        </tr>
                         <tr>
                            <td className="p-4 border border-white/10 font-bold">Timeline</td>
                            <td className="p-4 border border-white/10">Access is granted immediately upon successful registration or on the specific Batch Start Date.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </LegalLayout>
);

export const AboutUs: React.FC = () => (
    <LegalLayout title="About Us">
        <section>
            <p className="text-lg mb-6">
                Rapids Training Institutes is Kerala's premier offline destination for high-performance skill development. Located in Kunnamkulam, we specialize in transforming professionals through intensive, hands-on masterclasses.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-surface-dark-2 p-6 rounded-xl border border-white/5">
                    <h3 className="text-primary font-bold mb-2">Our Mission</h3>
                    <p className="text-sm text-gray-400">To bridge the gap between academic knowledge and real-world executive performance through rigorous, practice-based training.</p>
                </div>
                 <div className="bg-surface-dark-2 p-6 rounded-xl border border-white/5">
                    <h3 className="text-primary font-bold mb-2">Our Methodology</h3>
                    <p className="text-sm text-gray-400">We believe in small cohorts, personalized mentorship, and simulation-based learning. No theory—only practice.</p>
                </div>
            </div>

            <h3 className="text-white font-serif text-xl mb-4">Educational Disclaimer</h3>
            <div className="p-6 bg-white/5 border-l-4 border-yellow-500 rounded-r-xl">
                <p className="text-sm text-gray-300">
                    Rapids Training Institutes is a skills development center. While we equip our students with industry-standard skills, we <strong>do not guarantee jobs or placements</strong>. Career success depends on individual effort, market conditions, and interview performance.
                </p>
            </div>
        </section>
    </LegalLayout>
);
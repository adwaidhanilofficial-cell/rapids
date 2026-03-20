
import { motion } from 'framer-motion';

export function ShippingPolicy() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-gray-200 font-sans selection:bg-yellow-500/30 py-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block mb-4 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-semibold tracking-widest uppercase">
                        Delivery & Logistics
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">
                        Course Delivery Policy
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                        <p className="lead text-xl text-gray-300">
                            Rapids Training Institutes provides educational services. This policy outlines how our courses, materials, and potential physical admission cards are delivered to you. Please note that as a primary service provider, our "shipping" is largely digital and experiential.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">1. Service Nature & Method</h3>

                        <div className="my-8 p-8 border-2 border-yellow-500/50 rounded-2xl bg-yellow-500/5 flex flex-col items-center text-center">
                            <span className="material-icons-round text-5xl text-yellow-500 mb-4">no_photography</span>
                            <h4 className="text-white text-2xl font-bold mb-2">Digital & Physical Service Only</h4>
                            <p className="text-white/80 max-w-md">
                                <strong>Important:</strong> We do not ship physical products like books, DVDs, or merchandise via courier. Our "product" is the training you receive.
                            </p>
                        </div>

                        <p>
                            Our delivery mechanism consists of two phases:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Digital Onboarding:</strong> Immediate access to preparatory materials, schedules, and batch details via Email and WhatsApp.</li>
                            <li><strong>Physical Delivery:</strong> The training itself, delivered in-person at our designated venues in Kunnamkulam and other locations as specified.</li>
                        </ul>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">2. Communication & Admit Cards</h3>
                        <p>
                            Upon successful payment of the Breakdown Fee or Full Course Fee, the following delivery timeline is activated:
                        </p>
                        <div className="space-y-4 my-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-4 mt-1">
                                    <span className="material-icons-round text-green-500 text-sm">email</span>
                                </div>
                                <div>
                                    <strong className="text-white block">Instant Confirmation (0-1 Hour)</strong>
                                    <p className="text-sm">You will receive a payment receipt and a Welcome Email confirming your seat reservation.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 mt-1">
                                    <span className="material-icons-round text-blue-500 text-sm">chat</span>
                                </div>
                                <div>
                                    <strong className="text-white block">WhatsApp Onboarding (24 Hours)</strong>
                                    <p className="text-sm">Our support team will contact you via WhatsApp to verify your details and add you to the official batch group.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 mt-1">
                                    <span className="material-icons-round text-purple-500 text-sm">badge</span>
                                </div>
                                <div>
                                    <strong className="text-white block">Digital Admit Card (48 Hours before Class)</strong>
                                    <p className="text-sm">Your official Digital Admit Card, containing the venue map, timing, and checklist, will be sent to your registered email and WhatsApp.</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">3. Venue Scheduling</h3>
                        <p>
                            We pride ourselves on organization.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Venue Confirmation:</strong> The exact venue address (usually our Headquarters in Kunnamkulam or partner hotels) is confirmed at least <strong>1 month in advance</strong> for scheduled batches.</li>
                            <li><strong>Changes:</strong> Any change in venue due to emergency circumstances will be communicated via all channels (Email, SMS, WhatsApp) at least 3 days prior to the event.</li>
                        </ul>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">4. Accessing Course Material</h3>
                        <p>
                            Post-training support materials and digital notes are 'delivered' via our Learning Management System (LMS) or secure Google Drive links.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Access is granted within 24 hours of course completion.</li>
                            <li>Access remains valid for the duration specified in your course tier (usually Lifetime).</li>
                        </ul>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">5. International Students</h3>
                        <p>
                            For students traveling from outside India:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>We do not provide visa sponsorship services.</li>
                            <li>We can provide an "Invitation Letter" for visa purposes upon full payment of the course fee, which will be "delivered" via email within 3 business days of the request.</li>
                        </ul>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">Contact Support</h3>
                        <p>
                            If you have not received your confirmation email or admit card within the specified timelines, please check your spam folder or contact us immediately.
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

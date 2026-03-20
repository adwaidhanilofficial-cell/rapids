
import { motion } from 'framer-motion';

export function TermsAndConditions() {
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
                        Terms & Conditions
                    </h1>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                        <p className="lead text-xl text-gray-300">
                            Welcome to Rapids Training Institutes. By accessing our website, purchasing our courses, or participating in our training programs, you agree to be bound by the following Terms and Conditions. Please read them carefully.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">1. Service Overview</h3>
                        <p>
                            Rapids Training Institutes provides specialized communication and leadership training services. These services are delivered primarily through offline classroom sessions, workshops, and seminars. We reserve the right to modify the course curriculum, schedule, or venue at our discretion, with prior notice to enrolled students.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">2. Intellectual Property & Recording Policy</h3>
                        <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-xl my-6">
                            <h4 className="text-red-400 font-bold mb-2 flex items-center">
                                <span className="material-icons-round mr-2">videocam_off</span>
                                STRICT NO-RECORDING POLICY
                            </h4>
                            <p className="text-sm">
                                <strong>Video or audio recording of any class, workshop, or session is strictly prohibited.</strong>
                            </p>
                        </div>
                        <p>
                            All course materials, lectures, slides, and techniques taught at Rapids are the intellectual property of Rapids Training Institutes.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Zero Tolerance:</strong> Any student found recording sessions (video or audio) without explicit written permission will be <strong>immediately expelled</strong> from the program.</li>
                            <li><strong>No Refunds:</strong> Expulsion due to violation of this policy leads to immediate forfeiture of all fees paid. No refunds will be issued.</li>
                            <li><strong>Legal Action:</strong> We reserve the right to pursue legal action against individuals found distributing or selling our proprietary content.</li>
                        </ul>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">3. Eligibility & Age Requirements</h3>
                        <p>
                            Our programs are designed for adults seeking professional development.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li><strong>Minimum Age:</strong> Participants must be at least 18 years of age to enroll independently.</li>
                            <li><strong>Minors:</strong> Applicants under the age of 18 may enroll only with explicit, written <strong>Parental Consent</strong>. The parent or legal guardian must sign the enrollment form and accepts full responsibility for the minor's participation and conduct.</li>
                        </ul>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">4. Missed Classes & Transfer Policy</h3>
                        <p>
                            We understand that life happens. Our policy is designed to be flexible while maintaining the integrity of our batch schedules.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h5 className="text-white font-bold mb-2">Missed a Class?</h5>
                                <p className="text-sm">
                                    If you miss a specific session, you are entitled to <strong>Free Entry</strong> to the same session in the immediate next batch. You must inform support within 24 hours of the missed class.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h5 className="text-white font-bold mb-2">Batch Transfer</h5>
                                <p className="text-sm">
                                    You can transfer your entire enrollment to a future batch. This request must be made at least <strong>48 hours before</strong> your original batch starts. Subject to seat availability.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">5. Code of Conduct</h3>
                        <p>
                            Rapids fosters an environment of respect and growth. Detailed below are the behavioral expectations:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-6">
                            <li>Respect towards instructors and fellow students is mandatory.</li>
                            <li>Harassment, discrimination, or disruptive behavior will not be tolerated.</li>
                            <li>Alcohol or drug use during sessions is strictly prohibited.</li>
                        </ul>
                        <p>
                            Violation of these codes establishes grounds for immediate dismissal from the course without refund.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">6. Limitation of Liability</h3>
                        <p>
                            Rapids Training Institutes shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. We do not guarantee specific career outcomes, as success depends on the individual's effort and application of the skills learned.
                        </p>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">7. Governing Law & Jurisdiction</h3>
                        <p>
                            These Terms and Conditions are governed by the laws of India.
                        </p>
                        <div className="bg-white/5 border-l-4 border-yellow-500 p-6 my-6">
                            <p className="font-bold text-white mb-2">Dispute Resolution</p>
                            <p>
                                Any disputes, claims, or legal proceedings arising out of or in connection with these terms, your enrollment, or your use of our services shall be subject to the exclusive jurisdiction of the <strong>Courts in Thrissur, Kerala</strong>.
                            </p>
                        </div>

                        <h3 className="text-white mt-12 mb-6 text-2xl font-serif">Contact Information</h3>
                        <p>
                            For any legal concerns or clarifications regarding these terms, please contact us at:
                        </p>
                        <p className="font-bold text-white">
                            Email: <span className="text-yellow-500">support@rapids.in</span><br />
                            Address: Rapids Training Institutes, C Shape Building, Kunnamkulam, Kerala 680503.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

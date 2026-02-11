import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../components/Icon';

export const ContactUs: React.FC = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="pt-32 px-6 min-h-screen bg-background-dark"
        >
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-4xl text-white mb-12 text-center">Contact Us</h1>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-surface-dark-2 p-8 rounded-2xl border border-white/5 shadow-2xl">
                        <div className="mb-8">
                             <h3 className="text-primary font-bold uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
                                <Icon name="storefront" size="sm" /> Registered Office
                             </h3>
                             <p className="text-white text-lg leading-relaxed font-serif">
                                Rapids Training Institutes<br />
                                C Shape Building, Municipal,<br />
                                Near Old Bus Stand,<br />
                                Kunnamkulam, Kerala 680503
                             </p>
                        </div>
                       
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-primary font-bold uppercase tracking-wider text-xs mb-2">Phone</h3>
                                <a href="tel:08547636465" className="text-white text-xl hover:text-primary transition-colors block">
                                    085476 36465
                                </a>
                            </div>
                            <div>
                                <h3 className="text-primary font-bold uppercase tracking-wider text-xs mb-2">Email</h3>
                                <a href="mailto:rapidslearning@gmail.com" className="text-white text-xl hover:text-primary transition-colors block">
                                    rapidslearning@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="h-full min-h-[300px] rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.580297378776!2d76.07164731479836!3d10.65063999240836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7954e76c11b15%3A0x1d473489370776!2sKunnamkulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1645523456789!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { Icon } from '../components/icon';

interface ProfileProps {
    user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="px-6 py-12 max-w-4xl mx-auto min-h-screen"
        >
            <div className="bg-surface-dark-2 rounded-2xl border border-white/5 overflow-hidden">
                {/* Header Banner */}
                <div className="h-32 bg-gradient-to-r from-gray-900 to-black relative">
                    <div className="absolute inset-0 bg-primary/5"></div>
                </div>
                
                <div className="px-8 pb-8">
                    <div className="flex flex-col md:flex-row gap-6 items-end -mt-12 mb-8">
                        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-primary-dark relative shadow-xl">
                            <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-surface-dark-2" />
                            <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-surface-dark border border-white/20 flex items-center justify-center text-primary hover:bg-white/10 transition-colors">
                                <Icon name="edit" size="14px" />
                            </button>
                        </div>
                        <div className="flex-1 mb-2">
                            <h1 className="font-serif text-3xl text-white">{user.name}</h1>
                            <p className="text-primary text-xs tracking-widest uppercase font-bold mt-1">Premium Member</p>
                        </div>
                        <button className="mb-2 px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-colors">
                            Edit Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-black/30 rounded-xl p-6 border border-white/5 text-center flex flex-col items-center">
                            <Icon name="verified" className="text-primary mb-2" size="lg" />
                            <h3 className="text-3xl font-serif text-white mb-1">12</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Certificates Earned</p>
                        </div>
                        <div className="bg-black/30 rounded-xl p-6 border border-white/5 text-center flex flex-col items-center">
                            <Icon name="schedule" className="text-primary mb-2" size="lg" />
                            <h3 className="text-3xl font-serif text-white mb-1">480</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Hours of Learning</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                        {[
                            { icon: 'person_outline', label: 'Account Settings', desc: 'Manage your personal details' },
                            { icon: 'payment', label: 'Payment Methods', desc: 'Manage subscriptions & billing' },
                            { icon: 'notifications_none', label: 'Notifications', desc: 'Configure email & push alerts' },
                            { icon: 'language', label: 'Language & Region', desc: 'English (US), CST Timezone' },
                            { icon: 'lock_outline', label: 'Privacy & Security', desc: 'Password & 2FA' },
                            { icon: 'help_outline', label: 'Help & Support', desc: 'Contact our concierge' },
                        ].map((item, idx) => (
                            <button key={idx} className="w-full py-4 flex items-center justify-between hover:bg-white/5 rounded-xl transition-colors group px-2 border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-white/5 rounded-lg text-gray-400 group-hover:text-primary transition-colors">
                                        <Icon name={item.icon} />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-sm text-white block font-medium">{item.label}</span>
                                        <span className="text-xs text-gray-500">{item.desc}</span>
                                    </div>
                                </div>
                                <Icon name="chevron_right" className="text-gray-600" />
                            </button>
                        ))}
                    </div>
                    
                    <button className="w-full mt-12 py-4 text-red-500 text-sm font-bold tracking-wide hover:bg-red-500/10 rounded-xl transition-colors border border-red-500/20">
                        SIGN OUT
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
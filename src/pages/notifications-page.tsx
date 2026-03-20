import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../components/icon';

export const Notifications: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-6 py-12 max-w-3xl mx-auto min-h-screen"
        >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                <h1 className="font-serif text-3xl text-white">Notifications</h1>
                <button className="text-xs font-bold text-primary hover:text-white transition-colors">MARK ALL READ</button>
            </div>

            <div className="space-y-4">
                {[
                    { title: 'New Course Available', msg: 'Advanced Trading Strategies is now live.', time: '2 hours ago', icon: 'diamond', color: 'text-primary' },
                    { title: 'Goal Achieved', msg: 'You completed your weekly learning goal!', time: '1 day ago', icon: 'emoji_events', color: 'text-green-400' },
                    { title: 'System Update', msg: 'Rapids Training Institute will undergo scheduled maintenance tonight at 2:00 AM EST.', time: '2 days ago', icon: 'settings', color: 'text-gray-400' },
                    { title: 'New Comment', msg: 'Dr. Sarah replied to your question in Executive Communication.', time: '3 days ago', icon: 'chat', color: 'text-blue-400' },
                ].map((notif, i) => (
                    <div key={i} className="flex gap-6 p-6 bg-surface-dark-2 rounded-xl border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                        <div className={`mt-1 p-3 rounded-full bg-white/5 h-fit ${notif.color}`}>
                            <Icon name={notif.icon} />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-white text-base font-bold group-hover:text-primary transition-colors">{notif.title}</h4>
                                <span className="text-gray-600 text-xs whitespace-nowrap">{notif.time}</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">{notif.msg}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <button className="text-gray-500 text-sm hover:text-white transition-colors">View older notifications</button>
            </div>
        </motion.div>
    );
};
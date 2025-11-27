import React from 'react';
import { motion } from 'framer-motion';
import { X, Github, Linkedin, Mail, Globe } from 'lucide-react';

const AboutOverlay = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg bg-[#1a1a1a]/90 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Avatar Placeholder */}
                    <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                            <span className="text-3xl">👨‍💻</span>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">Venky</h2>
                    <p className="text-cyan-400 font-medium mb-6">Creative Developer & UI Engineer</p>

                    <p className="text-white/70 leading-relaxed mb-8">
                        Building immersive digital experiences at the intersection of design and technology.
                        Specializing in React, interactive physics, and modern web aesthetics.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        <SocialLink href="https://github.com" icon={Github} label="GitHub" />
                        <SocialLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
                        <SocialLink href="mailto:hello@example.com" icon={Mail} label="Email" />
                        <SocialLink href="https://example.com" icon={Globe} label="Website" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const SocialLink = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-cyan-500/30 hover:scale-110 transition-all duration-300 group"
        aria-label={label}
    >
        <Icon size={20} className="group-hover:text-cyan-400 transition-colors" />
    </a>
);

export default AboutOverlay;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        setDisplayedText(''); // Reset on new text

        if (!text) return;

        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, 30); // Typing speed

        return () => clearInterval(intervalId);
    }, [text]);

    return (
        <span className="typewriter-cursor">
            {displayedText}
        </span>
    );
};

const DialogueBubble = ({ agent, onClose }) => {
    if (!agent) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-90%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-100%" }}
            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-90%" }}
            className="absolute z-50 pointer-events-none"
            style={{
                left: agent.x,
                top: agent.y - agent.data.height / 2 - 20, // Position above the agent
            }}
        >
            <div className="bg-black/40 backdrop-blur-xl border border-white/20 text-white px-5 py-4 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] max-w-xs relative min-w-[200px]">
                <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <div className="font-bold text-sm tracking-widest uppercase text-green-400">{agent.data.label}</div>
                </div>

                <div className="text-sm text-white/90 leading-relaxed font-mono min-h-[3em]">
                    <TypewriterText text={agent.data.description} />
                </div>

                {/* Triangle pointer */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/20"></div>
            </div>
        </motion.div>
    );
};

export default DialogueBubble;

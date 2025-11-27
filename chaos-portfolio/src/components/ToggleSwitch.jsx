import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ isCleanMode, toggleMode }) => {
    return (
        <div
            className="relative flex items-center cursor-pointer bg-black/40 backdrop-blur-xl rounded-full p-1 w-36 border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)] hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-shadow duration-300"
            onClick={toggleMode}
        >
            <motion.div
                className="w-1/2 h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                    marginLeft: isCleanMode ? '50%' : '0%',
                }}
            />
            <div className="absolute inset-0 flex justify-between items-center px-4 text-[10px] font-bold tracking-widest pointer-events-none select-none">
                <span className={`${!isCleanMode ? "text-cyan-300 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" : "text-white/30"}`}>CHAOS</span>
                <span className={`${isCleanMode ? "text-cyan-300 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" : "text-white/30"}`}>CLEAN</span>
            </div>
        </div>
    );
};

export default ToggleSwitch;

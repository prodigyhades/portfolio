import React, { useState } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';
import PhysicsWorld from '../components/PhysicsWorld';
import CleanGrid from '../components/CleanGrid';
import AboutOverlay from '../components/AboutOverlay';
import { AnimatePresence, motion } from 'framer-motion';
import { Info } from 'lucide-react';

const MainLayout = () => {
    const [isCleanMode, setIsCleanMode] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    return (
        <div className="relative w-full h-screen bg-[#1a1a1a] overflow-hidden text-white">
            {/* Header / Controls */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
                <button
                    onClick={() => setIsAboutOpen(true)}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm group"
                    aria-label="About"
                >
                    <Info size={20} className="group-hover:text-cyan-400 transition-colors" />
                </button>
                <ToggleSwitch isCleanMode={isCleanMode} toggleMode={() => setIsCleanMode(!isCleanMode)} />
            </div>

            <div className="absolute top-6 left-6 z-50 pointer-events-none">
                <h1 className="text-2xl font-bold tracking-tighter opacity-80">CALM / CHAOS</h1>
            </div>

            {/* Content Area */}
            <div className="w-full h-full">
                <AnimatePresence mode="wait">
                    {isCleanMode ? (
                        <motion.div
                            key="clean"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full"
                        >
                            <CleanGrid />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chaos"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full"
                        >
                            <PhysicsWorld />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Overlays */}
            <AnimatePresence>
                {isAboutOpen && <AboutOverlay isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default MainLayout;

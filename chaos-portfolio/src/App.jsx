import React, { useState } from 'react';
import MainLayout from './layout/MainLayout';
import ProfessionalOverlay from './components/ProfessionalOverlay';
import { motion } from 'framer-motion';

function App() {
    const [isChaos, setIsChaos] = useState(false);

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#0a0a0a'
        }}>

            {/* LAYER 1: MAIN LAYOUT (Contains Clean/Chaos Toggle) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0
            }}>
                <MainLayout />
            </div>

            {/* LAYER 2: PROFESSIONAL OVERLAY (Renders on top) */}
            {/* Bidirectional control: isChaos determines if it's up or down */}
            <ProfessionalOverlay
                isChaos={isChaos}
                onToggleChaos={setIsChaos}
            />

            {/* FLOATING TOGGLE BUTTON */}
            <motion.button
                onClick={() => setIsChaos(!isChaos)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    zIndex: 10005, // Above everything
                    padding: '12px 24px',
                    borderRadius: '50px',
                    border: 'none',
                    background: isChaos ? 'rgba(250, 237, 38, 0.9)' : 'rgba(20, 20, 20, 0.8)',
                    color: isChaos ? '#000' : '#faed26',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: '"Aldrich", sans-serif'
                }}
            >
                {isChaos ? (
                    <>
                        <span>Return to Professional</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                    </>
                ) : (
                    <>
                        <span>Enter Chaos Mode</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </>
                )}
            </motion.button>

        </div>
    );
}

export default App;

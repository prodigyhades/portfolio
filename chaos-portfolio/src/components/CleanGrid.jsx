import React from 'react';
import { agents } from '../data/agents';
import { motion } from 'framer-motion';

const CleanGrid = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredAgents = agents.filter(agent =>
        agent.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full h-full overflow-y-auto p-4 md:p-12 custom-scrollbar">
            <div className="max-w-7xl mx-auto pt-20">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">System Modules</h2>
                        <p className="text-white/50">Explore active agents and protocols</p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search modules..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    key={searchTerm}
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {filteredAgents.map((agent) => (
                        <motion.div
                            key={agent.id}
                            variants={item}
                            className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-16 h-16 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {agent.src ? (
                                        <img
                                            src={agent.src}
                                            alt={agent.label}
                                            loading="lazy"
                                            className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
                                            style={{ borderColor: agent.color }}
                                        >
                                            <agent.icon size={28} color={agent.color} />
                                        </div>
                                    )}
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 border border-white/10 px-2 py-1 rounded-full group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors duration-300">
                                    {agent.category}
                                </span>
                            </div>

                            <div className="mt-auto">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">{agent.label}</h3>
                                <p className="text-sm text-white/60 leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
                                    {agent.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {filteredAgents.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/30 text-lg">No modules found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CleanGrid;

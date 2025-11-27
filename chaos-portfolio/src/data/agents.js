import {
    Watch, Shield, Activity, Mountain, Dog, Dice5, Orbit, BrainCircuit,
    CloudRain, Sword, BookOpen, FlaskConical, Disc, Zap, Tv, MapPin,
    Terminal, Crosshair
} from 'lucide-react';

// Dynamic Asset Loading
// Files must be named: "Category - Name.ext"
const globImports = import.meta.glob('../assets/agents/*.*', { eager: true });

const getIconAndColor = (category) => {
    const map = {
        'Anime': { icon: Sword, color: "#f97316" },
        'Ghibli': { icon: CloudRain, color: "#84cc16" },
        'Cartoons': { icon: FlaskConical, color: "#a855f7" },
        'Space': { icon: Orbit, color: "#6366f1" },
        'Gaming': { icon: Crosshair, color: "#dc2626" },
        'Sports': { icon: Activity, color: "#10b981" },
        'Meme': { icon: Zap, color: "#ec4899" },
        'Fashion': { icon: Watch, color: "#ef4444" },
        'Background': { icon: Shield, color: "#3b82f6" },
        'Adventure': { icon: Mountain, color: "#f59e0b" },
        'Animals': { icon: Dog, color: "#ec4899" },
        'Board Games': { icon: Dice5, color: "#8b5cf6" },
        'Goal': { icon: BrainCircuit, color: "#14b8a6" },
        'Books': { icon: BookOpen, color: "#06b6d4" },
        'Nostalgia': { icon: Disc, color: "#e11d48" },
        'Marvel': { icon: Zap, color: "#eab308" },
        'TV Shows': { icon: Tv, color: "#64748b" },
        'Travel': { icon: MapPin, color: "#f43f5e" },
        'Career': { icon: Terminal, color: "#22c55e" },
    };
    return map[category] || { icon: Zap, color: "#94a3b8" }; // Default
};

const getSpecialBehavior = (filename) => {
    if (filename.includes('RickRoll')) return { behavior: 'repel', personality: 'chaotic' };
    if (filename.includes('UY Scuti')) return { behavior: 'attract', personality: 'dominant' };
    return { behavior: 'wander', personality: 'friendly' };
};

export const agents = Object.entries(globImports).map(([path, module]) => {
    const filename = path.split('/').pop().split('.')[0]; // Remove extension
    const [category, label] = filename.split(' - ').map(s => s?.trim());

    if (!category || !label) {
        console.warn(`Skipping invalid filename format: ${filename}. Expected "Category - Name.ext"`);
        return null;
    }

    const { icon, color } = getIconAndColor(category);
    const { behavior, personality } = getSpecialBehavior(filename);

    return {
        id: filename.toLowerCase().replace(/\s+/g, '-'),
        label: label,
        category: category,
        icon: icon,
        src: module.default, // Vite glob import returns module with default export as URL
        description: `${category} enthusiast.`, // Default description
        color: color,
        width: 110,
        height: 110,
        behavior: behavior,
        personality: personality
    };
}).filter(Boolean);

# Calm-Chaos Portfolio

A "Living Moodboard" portfolio that switches between a chaotic, physics-based playground and a clean, professional grid.

## Tech Stack
- **React** (Vite)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Matter.js** (Physics Engine)
- **Lucide React** (Icons)

## Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

## Customization

### Adding New Fragments
To add or modify the interests (Shards), edit `src/data/fragments.js`.

Each fragment object requires:
```javascript
{ 
  id: number, 
  label: string, 
  category: string, 
  icon: LucideIcon, 
  description: string, 
  color: string // Hex code
}
```

### Changing Physics
You can tweak the physics properties (gravity, restitution, friction) in `src/components/PhysicsWorld.jsx`.

## Project Structure
- `src/components`: Core UI components (`PhysicsWorld`, `CleanGrid`, `ToggleSwitch`).
- `src/layout`: Main layout wrapper.
- `src/data`: Static data files.

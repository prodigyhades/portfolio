import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { agents } from '../data/agents';
import DialogueBubble from './DialogueBubble';
import StarfieldBackground from './StarfieldBackground';
import MouseTrail from './MouseTrail';
import { AnimatePresence } from 'framer-motion';
import spaceBg from '../assets/space-bg.jpg';

const PhysicsWorld = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const [bodies, setBodies] = useState([]);
    const [activeAgent, setActiveAgent] = useState(null);

    useEffect(() => {
        // ... (Module aliases and Engine creation - unchanged) ...
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events,
            Body = Matter.Body,
            Vector = Matter.Vector;

        // Create engine
        const engine = Engine.create();
        engineRef.current = engine;

        // Zero Gravity
        engine.gravity.y = 0;
        engine.gravity.x = 0;

        // Create renderer (invisible)
        const isMobile = window.innerWidth < 768;

        // Optimize iterations for mobile
        if (isMobile) {
            engine.positionIterations = 4;
            engine.velocityIterations = 4;
        }

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'transparent',
                wireframes: false,
                showAngleIndicator: false
            }
        });

        // Create bodies
        const newBodies = agents.map((agent) => {
            const x = Math.random() * (window.innerWidth - 200) + 100;
            const y = Math.random() * (window.innerHeight - 200) + 100;

            const width = agent.width || 100;
            const height = agent.height || 100;

            const body = Bodies.rectangle(x, y, width, height, {
                chamfer: { radius: 10 },
                restitution: 0.5,
                friction: 0.1,
                frictionAir: 0.05,
                render: { fillStyle: 'transparent' },
                label: agent.label,
                plugin: {
                    data: agent,
                    wanderTarget: { x: x, y: y },
                    wanderTimer: 0
                }
            });
            return body;
        });

        // Walls
        const wallThickness = 200;
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + wallThickness / 2, window.innerWidth, wallThickness, wallOptions);
        const ceiling = Bodies.rectangle(window.innerWidth / 2, -wallThickness / 2, window.innerWidth, wallThickness, wallOptions);
        const leftWall = Bodies.rectangle(-wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, wallOptions);
        const rightWall = Bodies.rectangle(window.innerWidth + wallThickness / 2, window.innerHeight / 2, wallThickness, window.innerHeight, wallOptions);

        Composite.add(engine.world, [...newBodies, ground, ceiling, leftWall, rightWall]);

        // Mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.9,
                render: { visible: false }
            }
        });

        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Handle clicks via Matter.js events (since Canvas is on top)
        let lastClickTime = 0;
        let lastClickedBodyId = null;

        Events.on(mouseConstraint, 'mousedown', (event) => {
            const mousePosition = event.mouse.position;
            const allBodies = Composite.allBodies(engine.world);
            const clickedBodies = Matter.Query.point(allBodies, mousePosition);

            // Filter out walls or other non-agent bodies if necessary
            const agentBody = clickedBodies.find(b => b.plugin && b.plugin.data);
            const now = Date.now();

            if (agentBody) {
                // Check for double click (same body, < 300ms)
                if (agentBody.id === lastClickedBodyId && now - lastClickTime < 300) {
                    setActiveAgent({
                        id: agentBody.id,
                        data: agentBody.plugin.data,
                        x: agentBody.position.x,
                        y: agentBody.position.y
                    });
                    // Reset to prevent immediate re-trigger
                    lastClickTime = 0;
                    lastClickedBodyId = null;
                } else {
                    // First click (or too slow) - just track it
                    lastClickTime = now;
                    lastClickedBodyId = agentBody.id;
                }
            } else {
                // Clicked background - dismiss
                setActiveAgent(null);
                lastClickTime = 0;
                lastClickedBodyId = null;
            }
        });



        // Game Loop / AI Behavior
        Events.on(engine, 'beforeUpdate', (event) => {
            const time = engine.timing.timestamp;
            const mousePos = mouse.position;

            newBodies.forEach(body => {
                if (mouseConstraint.body === body) return; // Skip dragged body

                // 1. Special Agent Forces (Attract/Repel)
                newBodies.forEach(sourceBody => {
                    if (sourceBody === body) return; // Don't interact with self

                    const behavior = sourceBody.plugin.data.behavior;

                    if (behavior === 'repel' || behavior === 'attract') {
                        const dx = body.position.x - sourceBody.position.x;
                        const dy = body.position.y - sourceBody.position.y;
                        const distSq = dx * dx + dy * dy;
                        const range = 400; // Interaction range

                        if (distSq < range * range && distSq > 100) { // Min distance to avoid glitches
                            const dist = Math.sqrt(distSq);
                            let forceMag = 0.001 * (1 - dist / range); // Base strength

                            if (behavior === 'repel') {
                                forceMag *= 2.0; // Stronger repel
                            } else if (behavior === 'attract') {
                                forceMag *= -1;
                            }

                            const force = Vector.create(
                                (dx / dist) * forceMag,
                                (dy / dist) * forceMag
                            );
                            Body.applyForce(body, body.position, force);
                        }
                    }
                });

                // 2. Wander Logic
                if (time > body.plugin.wanderTimer) {
                    const angle = Math.random() * Math.PI * 2;
                    const forceMag = 0.0005 * body.mass;
                    const force = Vector.create(
                        Math.cos(angle) * forceMag,
                        Math.sin(angle) * forceMag
                    );
                    Body.applyForce(body, body.position, force);
                    body.plugin.wanderTimer = time + 1000 + Math.random() * 2000;
                }

                Body.setAngle(body, 0);
                Body.setAngularVelocity(body, 0);
            });
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        const updateReactState = () => {
            const bodyData = newBodies.map(b => ({
                id: b.id,
                x: b.position.x,
                y: b.position.y,
                angle: b.angle,
                data: b.plugin.data,
                velocity: b.velocity
            }));
            setBodies(bodyData);
        };

        Events.on(engine, 'afterUpdate', updateReactState);

        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + wallThickness / 2 });
            Body.setPosition(ceiling, { x: window.innerWidth / 2, y: -wallThickness / 2 });
            Body.setPosition(leftWall, { x: -wallThickness / 2, y: window.innerHeight / 2 });
            Body.setPosition(rightWall, { x: window.innerWidth + wallThickness / 2, y: window.innerHeight / 2 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(engine.world);
            Engine.clear(engine);
            render.canvas.remove();
            render.canvas = null;
            render.context = null;
            render.textures = {};
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden isolate">
            {/* Background Image: z-0 */}
            <div className="absolute inset-0 z-0">
                <img
                    src={spaceBg}
                    alt="Space Background"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>

            {/* Starfield: z-10 */}
            <StarfieldBackground />

            {/* Mouse Trail: z-35 */}
            <MouseTrail />

            {/* Matter.js Canvas (Interaction Layer): z-30 - ON TOP */}
            <div ref={sceneRef} className="absolute inset-0 z-30" />

            {/* React rendered bodies: z-20 - VISUALS ONLY */}
            {bodies.map((b) => {
                const isFlipped = b.velocity.x < -0.1;

                return (
                    <div
                        key={b.id}
                        className="absolute flex items-center justify-center pointer-events-none z-20"
                        style={{
                            transform: `translate(${b.x - b.data.width / 2}px, ${b.y - b.data.height / 2}px)`,
                            width: `${b.data.width}px`,
                            height: `${b.data.height}px`
                        }}
                    >
                        <div
                            className="w-full h-full relative group animate-float"
                        >
                            {b.data.src ? (
                                <img
                                    src={b.data.src}
                                    alt={b.data.label}
                                    className="w-full h-full object-contain transition-transform duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    style={{
                                        transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
                                        filter: activeAgent?.id === b.id ? 'drop-shadow(0 0 20px rgba(255,255,255,0.6)) brightness(1.2)' : 'none'
                                    }}
                                    draggable={false}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <b.data.icon size={32} color={b.data.color} />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}


            <AnimatePresence>
                {activeAgent && (
                    <DialogueBubble agent={activeAgent} onClose={() => setActiveAgent(null)} />
                )}
            </AnimatePresence>
        </div >
    );
};

export default PhysicsWorld;

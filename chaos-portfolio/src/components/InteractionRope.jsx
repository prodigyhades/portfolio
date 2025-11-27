import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const InteractionRope = ({ onTrigger }) => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);

    useEffect(() => {
        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Composites = Matter.Composites,
            Common = Matter.Common,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            Composite = Matter.Composite,
            Bodies = Matter.Bodies,
            Events = Matter.Events,
            Body = Matter.Body,
            Constraint = Matter.Constraint;

        // Create engine
        const engine = Engine.create();
        const world = engine.world;
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });

        Render.run(render);

        // Create runner
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Add bodies
        const group = Body.nextGroup(true);

        // Rope
        const rope = Composites.stack(window.innerWidth / 2, 0, 1, 9, 0, 20, function (x, y) {
            return Bodies.rectangle(x, y, 10, 20, {
                collisionFilter: { group: group },
                render: { fillStyle: '#FAED26' }
            });
        });

        Composites.chain(rope, 0.5, 0, -0.5, 0, {
            stiffness: 0.8,
            length: 10,
            render: { type: 'line', strokeStyle: '#FAED26' }
        });

        // Anchor at top
        Composite.add(rope, Constraint.create({
            bodyB: rope.bodies[0],
            pointB: { x: 0, y: -10 },
            pointA: { x: rope.bodies[0].position.x, y: rope.bodies[0].position.y },
            stiffness: 0.5
        }));

        // Handle at bottom
        const handle = Bodies.circle(window.innerWidth / 2, 300, 20, {
            collisionFilter: { group: group },
            render: { fillStyle: '#ff6b00' } // Orange handle
        });

        // Attach handle to rope
        Composite.add(rope, Constraint.create({
            bodyB: handle,
            bodyA: rope.bodies[rope.bodies.length - 1],
            stiffness: 0.5
        }));

        Composite.add(world, [rope, handle]);

        // Add mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

        Composite.add(world, mouseConstraint);

        // Keep the mouse in sync with rendering
        render.mouse = mouse;

        // Trigger logic
        Events.on(engine, 'afterUpdate', function () {
            if (handle.position.y > window.innerHeight * 0.7) {
                if (onTrigger) {
                    onTrigger();
                }
            }
        });

        // Handle resize
        const handleResize = () => {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            // Reposition anchor if needed (simplified here)
        };

        window.addEventListener('resize', handleResize);

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            window.removeEventListener('resize', handleResize);
        };
    }, [onTrigger]);

    return (
        <div ref={sceneRef} className="absolute inset-0 z-[100] pointer-events-none" />
    );
};

export default InteractionRope;

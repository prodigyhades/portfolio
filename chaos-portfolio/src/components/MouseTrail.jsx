import React, { useEffect, useRef } from 'react';

const MouseTrail = () => {
    const canvasRef = useRef(null);
    const trailRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const handleMouseMove = (e) => {
            // Add new point
            trailRef.current.push({
                x: e.clientX,
                y: e.clientY,
                age: 0
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Filter out old points
            trailRef.current = trailRef.current.filter(p => p.age < 25);

            if (trailRef.current.length < 2) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // Draw trail
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // Draw segments
            for (let i = 1; i < trailRef.current.length; i++) {
                const prev = trailRef.current[i - 1];
                const curr = trailRef.current[i];

                // Increment age
                curr.age += 1;

                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(curr.x, curr.y);

                // Fade out based on age
                const opacity = 1 - (curr.age / 25);
                ctx.lineWidth = 3 * opacity;
                ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
                ctx.shadowBlur = 10 * opacity;
                ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
                ctx.stroke();
            }
            // Increment age of first point too since loop starts at 1
            if (trailRef.current.length > 0) trailRef.current[0].age += 1;

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[35] pointer-events-none"
        />
    );
};

export default MouseTrail;

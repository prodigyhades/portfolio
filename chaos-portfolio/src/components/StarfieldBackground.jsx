import React, { useEffect, useRef } from 'react';

const StarfieldBackground = () => {
    const canvasRef = useRef(null);

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

        // Star properties
        const stars = [];
        const numStars = 200;
        const mouse = { x: 0, y: 0 };

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                vx: (Math.random() - 0.5) * 0.2, // Slow drift velocity
                vy: (Math.random() - 0.5) * 0.2,
                originalX: Math.random() * canvas.width, // For parallax reference
                originalY: Math.random() * canvas.height,
                color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})` // Varying opacity
            });
        }

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Clear canvas but keep it transparent
            ctx.clearRect(0, 0, canvas.width, canvas.height);


            stars.forEach(star => {
                // Parallax effect based on mouse position
                const parallaxX = (mouse.x - canvas.width / 2) * 0.02;
                const parallaxY = (mouse.y - canvas.height / 2) * 0.02;

                // Move star
                star.x += star.vx;
                star.y += star.vy;

                // Wrap around screen
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                // Draw star
                ctx.beginPath();
                ctx.arc(
                    star.x + parallaxX * (star.radius * 0.5), // Depth effect
                    star.y + parallaxY * (star.radius * 0.5),
                    star.radius,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = star.color;
                ctx.fill();
            });

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
            className="absolute inset-0 z-10 pointer-events-none"
        />
    );
};

export default StarfieldBackground;

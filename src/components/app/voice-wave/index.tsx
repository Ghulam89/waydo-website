import { useEffect, useRef } from "react";
import { VoiceWavePropsI } from "./voice-wave.interface";

export default function VoiceWave({ isActive }: VoiceWavePropsI) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationIdRef = useRef<number | null>(null);
    const frame = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        const drawCircles = () => {
            frame.current += 0.02;
            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            const centerX = WIDTH / 2;
            const centerY = HEIGHT / 2;

            const radii = [
                Math.sin(frame.current) * 10 + 40,  // Pequeño
                Math.sin(frame.current + 1) * 10 + 70, // Mediano
                Math.sin(frame.current + 2) * 10 + 100  // Grande
            ];

            const alphas = [0.9, 0.6, 0.3]; // Opacidad decreciente

            radii.forEach((radius, index) => {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.strokeStyle = `rgba(225, 225, 225, ${alphas[index]})`;
                ctx.lineWidth = 5;
                ctx.stroke();
            });

            if (isActive) {
                animationIdRef.current = requestAnimationFrame(drawCircles);
            }
        };

        if (isActive) {
            drawCircles();
        } else {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        }

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [isActive]);

    return (
        <canvas
            ref={canvasRef}
            width="150"
            height="150"
            style={{
                backgroundColor: '#fa466c',
                borderRadius: '50%',
                display: 'block'
            }}
        />
    );
}
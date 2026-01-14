import { useEffect, useRef } from 'react';
import { getColors } from '../helper/NutrientChartHelper';

export default function NutrientDonutChart({ percentage, nutrient }) {
    const canvasRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set up dimensions
        const size = canvas.width;
        const centerX = size / 2;
        const centerY = size / 2;
        const outerRadius = size / 2 - 13;
        const innerRadius = outerRadius * 0.65;
        const lineWidth = outerRadius - innerRadius;

        // Clear canvas
        ctx.clearRect(0, 0, size, size);

        const colors = getColors(nutrient);
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, colors.gradient1);
        gradient.addColorStop(1, colors.gradient2);

        // Draw background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius - lineWidth / 2, 0, 2 * Math.PI);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = colors.background;
        ctx.stroke();

        // Calculate angles for the progress arc
        const startAngle = -0.5 * Math.PI;
        const endAngle = startAngle + (percentage / 100) * 2 * Math.PI;

        // Draw progress arc with gradient
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius - lineWidth / 2, startAngle, endAngle);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.strokeStyle = gradient;
        ctx.stroke()

        // Add shadow effect to the progress arc
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius - lineWidth / 2, startAngle, endAngle);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.restore();

        // Draw inner circle (to create donut)
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius - 5, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();

        // Add shadow to inner circle
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.05)";
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius - 5, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();

        // Draw percentage text
        ctx.fillStyle = colors.text;
        ctx.font = "bold 32px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${percentage}%`, centerX, centerY - 10);

        // Draw label text
        ctx.fillStyle = "#64748b";
        ctx.font = "14px Inter, system-ui, sans-serif";
        ctx.fillText(nutrient.charAt(0).toUpperCase() + nutrient.slice(1), centerX, centerY + 20);

        // Draw decorative dots around the chart
        if (percentage > 0) {
            const dotCount = 8;
            const dotRadius = 2;
            const dotDistance = outerRadius + 10;

            for (let i = 0; i < dotCount; i++) {
                const angle = startAngle + (i / dotCount) * (endAngle - startAngle);
                const x = centerX + Math.cos(angle) * dotDistance;
                const y = centerY + Math.sin(angle) * dotDistance;

                ctx.beginPath();
                ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
                ctx.fillStyle = colors.gradient1;
                ctx.fill();
            }
        }
    }, [percentage, nutrient])

    return <canvas ref={canvasRef} width={240} height={240} className="w-60 h-60" />
}




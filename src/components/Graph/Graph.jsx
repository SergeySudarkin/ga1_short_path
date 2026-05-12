import { } from "react";
import { useSettings } from './../../hooks/useSettings'

export const Graph = () => {
    const { settings, matrix, generations } = useSettings();

    const n = matrix.length;

    const size = 1000;
    const center = 500;

    const radius = 400;

    const nodeRadius = Math.max(6, 20 - n * 0.4);
    const fontSize = Math.max(8, 16 - n * 0.3);

    const nodes = Array.from({ length: n }).map((_, i) => {
        const angle = (2 * Math.PI * i) / n;
        return {
            x: center + radius * Math.cos(angle),
            y: center + radius * Math.sin(angle),
        };
    });

    const bestChromosome = generations.at(-1)?.population[0]?.chromosome || [];
    const bestEdges = new Set();

    for (let i = 0; i < bestChromosome.length - 1; i++) {
        const from = bestChromosome[i] - 1;
        const to = bestChromosome[i + 1] - 1;

        bestEdges.add(`${from}-${to}`);
        bestEdges.add(`${to}-${from}`);
    }

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 1000"
        >
            {/* РЁБРА */}
            {matrix.map((row, i) =>
                row.map((weight, j) => {
                    if (
                        i >= j ||
                        weight === 0 ||
                        weight === null ||
                        weight === Infinity
                    ) return null;

                    const x1 = nodes[i].x;
                    const y1 = nodes[i].y;
                    const x2 = nodes[j].x;
                    const y2 = nodes[j].y;

                    return (
                        <g key={`edge-${i}-${j}`}>
                            <line x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke={
                                    bestEdges.has(`${i}-${j}`) ? "#4CAF50" : "#999"
                                }
                                strokeWidth={
                                    bestEdges.has(`${i}-${j}`) ? 4 : 1
                                }
                            />

                            <text
                                x={(x1 + x2) / 2}
                                y={(y1 + y2) / 2}
                                fontSize={fontSize - 2}
                                textAnchor="middle"
                            >
                                {weight}
                            </text>
                        </g>
                    );
                })
            )}

            {/* ВЕРШИНЫ */}
            {nodes.map((node, i) => (
                <g key={i}>
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r={nodeRadius}
                        fill={i === settings.startPeak - 1 || i === settings.endPeak - 1 ? "#4CAF50" : "red"}
                    />

                    <text
                        x={node.x}
                        y={node.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize={fontSize}
                    >
                        {i + 1}
                    </text>
                </g>
            ))}
        </svg>
    );
};
import React from 'react';

export default function MiniMap({ myths, links, currentTransform, onClick }) {
  const scale = 0.15;
  const nodePositions = {};
  myths.forEach((m, i) => {
    nodePositions[m.id] = [100 + i * 260, 100];
  });

  return (
    <svg width={250} height={150} className="absolute bottom-4 right-4 z-50 bg-white shadow rounded">
      {links.map((link, i) => {
        const [x1, y1] = nodePositions[link.from];
        const [x2, y2] = nodePositions[link.to];
        return (
          <line
            key={i}
            x1={x1 * scale}
            y1={y1 * scale}
            x2={x2 * scale}
            y2={y2 * scale}
            stroke="gray"
            strokeWidth={1}
          />
        );
      })}

      {myths.map((node) => {
        const [x, y] = nodePositions[node.id];
        return (
          <circle
            key={node.id}
            cx={x * scale + 5}
            cy={y * scale + 5}
            r={5}
            fill="gold"
            stroke="black"
            onClick={() => onClick(node.id)}
            className="cursor-pointer"
          />
        );
      })}

      {currentTransform && (
        <rect
          x={-currentTransform.x * scale / currentTransform.k}
          y={-currentTransform.y * scale / currentTransform.k}
          width={window.innerWidth * scale / currentTransform.k}
          height={window.innerHeight * scale / currentTransform.k}
          stroke="red"
          fill="none"
        />
      )}
    </svg>
  );
}

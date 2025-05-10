import React from 'react';

export default function MythNode({ node, x, y, onClick, onRightClick }) {
  const hasSubBoard = !!node.subBoard;

  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={(e) => { e.preventDefault(); onClick(node); }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (hasSubBoard) onRightClick(node);
      }}
      className="cursor-pointer"
    >
      <rect
        width="160"
        height="60"
        fill="#ffd700"
        rx="8"
        stroke={hasSubBoard ? '#8b5cf6' : 'black'} // purple glow if sub-board exists
        strokeWidth={hasSubBoard ? 3 : 1}
      />
      <text x="80" y="30" textAnchor="middle" dominantBaseline="middle" fontSize="14">
        {node.title}
        {hasSubBoard && ' 🔁'} {/* icon for sub-board */}
      </text>
    </g>
  );
}

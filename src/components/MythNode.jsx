import React from 'react';

export default function MythNode({ node, x, y, onClick, onRightClick }) {
  const hasSubBoard = !!node.subBoard;

  return (
    <g
      transform={`translate(${x},${y})`}
      className="cursor-pointer"
      onClick={(e) => {
        e.preventDefault();     // Prevent default left-click behavior (e.g. text selection)
        onClick(node);          // Trigger the node modal
      }}
      onContextMenu={(e) => {
        e.preventDefault();     // 👈 IMPORTANT: stop browser's right-click menu
        if (hasSubBoard) {
          onRightClick(node);   // Trigger the sub-board view
        }
      }}
    >
      <rect
        width="160"
        height="60"
        fill="#ffd700"
        rx="8"
        stroke={hasSubBoard ? '#8b5cf6' : 'black'} // purple border if sub-board
        strokeWidth={hasSubBoard ? 3 : 1}
      />
      <text
        x="80"
        y="30"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
      >
        {node.title}
        {hasSubBoard && ' 🔁'} {/* Show icon if has sub-board */}
      </text>
    </g>
  );
}

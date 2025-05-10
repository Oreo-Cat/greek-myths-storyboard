import React from 'react';

export default function MythNode({ node, x, y, onClick }) {
  return (
    <g transform={`translate(${x},${y})`} onClick={() => onClick(node)} className="cursor-pointer">
      <rect width="160" height="60" fill="#ffd700" rx="8" stroke="black" />
      <text x="80" y="30" textAnchor="middle" dominantBaseline="middle" fontSize="14">{node.title}</text>
    </g>
  );
}

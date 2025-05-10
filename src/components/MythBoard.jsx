import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import MythNode from './MythNode';
import MythModal from './MythModal';
import SearchBar from './SearchBar';
import MiniMap from './MiniMap';

const linkColors = {
  cause: 'red',
  timeline: 'blue',
  character: 'green',
};

export default function MythBoard({ myths, links, depth = 0 }) {
  const svgRef = useRef();
  const [transform, setTransform] = useState(d3.zoomIdentity);
  const [selectedNode, setSelectedNode] = useState(null);
  const [subBoard, setSubBoard] = useState(null);

  const nodePositions = {};
  myths.forEach((m, i) => {
    nodePositions[m.id] = [100 + i * 260, 100];
  });

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.call(d3.zoom().on('zoom', ({ transform }) => setTransform(transform)));
  }, []);

  const zoomToNode = (id) => {
    const [x, y] = nodePositions[id];
    const svg = d3.select(svgRef.current);
    svg.transition().duration(500).call(
      d3.zoom().transform,
      d3.zoomIdentity.translate(window.innerWidth / 2 - x - 80, window.innerHeight / 2 - y - 30).scale(1)
    );
  };

  const handleDoubleClick = (node) => {
    if (node.subBoard) {
      setSubBoard({ myths: node.subBoard, links: [] });
    }
  };

  return (
    <>
      {!subBoard ? (
        <>
          <SearchBar myths={myths} onSelect={zoomToNode} />
          <MiniMap myths={myths} links={links} currentTransform={transform} onClick={zoomToNode} />
          <svg ref={svgRef} className="w-full h-screen bg-gray-100">
            <g transform={transform.toString()}>
              {links.map((link, i) => {
                const [x1, y1] = nodePositions[link.from];
                const [x2, y2] = nodePositions[link.to];
                return (
                  <line
                    key={i}
                    x1={x1 + 80}
                    y1={y1 + 30}
                    x2={x2 + 80}
                    y2={y2 + 30}
                    stroke={linkColors[link.type] || 'gray'}
                    strokeWidth={2}
                  />
                );
              })}
              {myths.map((node) => {
                const [x, y] = nodePositions[node.id];
                return (
                  <g key={node.id}>
                    <MythNode
                      node={node}
                      x={x}
                      y={y}
                      onClick={setSelectedNode}
                      onRightClick={handleOpenSubBoard}
                    />
                  </g>
                    <MythNode node={node} x={x} y={y} onClick={setSelectedNode} />
                  </g>
                );
              })}
            </g>
          </svg>
        </>
      ) : (
        <>
          <button
            onClick={() => setSubBoard(null)}
            className="bg-purple-600 text-white px-4 py-2 m-2 rounded">
            ← Back
          </button>
          <MythBoard myths={subBoard.myths} links={subBoard.links} depth={depth + 1} />
        </>
      )}
      <MythModal node={selectedNode} onClose={() => setSelectedNode(null)} />
    </>
  );
}

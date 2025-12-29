import { useMemo, useRef, useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  MarkerType
} from "reactflow";
import { toPng } from "html-to-image";
import "reactflow/dist/style.css";

import data from "../data/mindmapData.json";
import MindmapNode from "./MindmapNode";

const nodeTypes = { mindmap: MindmapNode };

const NODE_GAP_X = 220;
const NODE_GAP_Y = 140;

/* ---------------- SUBTREE WIDTH ---------------- */
function measure(node, expanded) {
  if (!node.children || node.children.length === 0) return 1;
  if (expanded[node.id] === false) return 1;

  return node.children.reduce(
    (sum, child) => sum + measure(child, expanded),
    0
  );
}

/* ---------------- TREE BUILDER ---------------- */
function buildTree(
  node,
  nodes,
  edges,
  level,
  parentId,
  xStart,
  expanded,
  parentData,
  query
) {
  const width = measure(node, expanded);
  const xCenter = xStart + (width * NODE_GAP_X) / 2;

  const nodeData = {
    ...node,
    parent: parentData,
    hasChildren: node.children?.length > 0,
    highlight:
      query &&
      node.label.toLowerCase().includes(query.toLowerCase())
  };

  nodes.push({
    id: node.id,
    type: "mindmap",
    position: { x: xCenter, y: level * NODE_GAP_Y },
    data: nodeData
  });

  if (parentId) {
    edges.push({
      id: `${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
      type: "smoothstep",
      markerEnd: { type: MarkerType.ArrowClosed }
    });
  }

  if (expanded[node.id] === false) return;

  let childX = xStart;
  node.children?.forEach(child => {
    const childWidth = measure(child, expanded);

    buildTree(
      child,
      nodes,
      edges,
      level + 1,
      node.id,
      childX,
      expanded,
      nodeData,
      query
    );

    childX += childWidth * NODE_GAP_X;
  });
}

/* ---------------- COMPONENT ---------------- */
export default function Mindmap({ onSelect }) {
  const [expanded, setExpanded] = useState({});
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const { nodes, edges } = useMemo(() => {
    const n = [];
    const e = [];

    buildTree(
      data,
      n,
      e,
      0,
      null,
      0,
      expanded,
      null,
      query
    );

    return { nodes: n, edges: e };
  }, [expanded, query]);

  const onNodeClick = (_, node) => {
    onSelect(node.data);

    if (node.data.hasChildren) {
      setExpanded(prev => ({
        ...prev,
        [node.id]: !prev[node.id]
      }));
    }
  };

  /* -------- EXPORT IMAGE -------- */
  const exportImage = () => {
    if (!wrapperRef.current) return;

    toPng(wrapperRef.current, { cacheBust: true }).then(dataUrl => {
      const link = document.createElement("a");
      link.download = "mindmap.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="mindmap-wrapper" ref={wrapperRef}>
      

      {/* Export */}
      <button className="export-btn" onClick={exportImage}>
        📸 Export
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background variant="dots" gap={18} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

import React, { useMemo, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds
} from 'reactflow'
import 'reactflow/dist/style.css'
import { toPng } from 'html-to-image'

/* ---------------- CONSTANTS ---------------- */

const NODE_WIDTH = 180
const LEVEL_HEIGHT = 140
const SIBLING_GAP = 40

/* ---------------- LAYOUT HELPERS ---------------- */

function getSubtreeWidth(node, collapsed) {
  if (collapsed.has(node.id) || !node.children?.length) {
    return NODE_WIDTH
  }

  return node.children.reduce(
    (sum, child) =>
      sum + getSubtreeWidth(child, collapsed) + SIBLING_GAP,
    -SIBLING_GAP
  )
}

function buildTree(
  node,
  x,
  y,
  parent,
  nodes,
  edges,
  collapsed
) {
  nodes.push({
    id: node.id,
    data: {
      label: node.label,
      description: node.description,
      hasChildren: !!node.children?.length
    },
    position: { x, y },
    style: {
      width: NODE_WIDTH,
      padding: 12,
      borderRadius: 10,
      border: '2px solid #0d6efd',
      textAlign: 'center',
      fontWeight: 500
    }
  })

  if (parent) {
    edges.push({
      id: `${parent}-${node.id}`,
      source: parent,
      target: node.id,
      markerEnd: { type: MarkerType.ArrowClosed }
    })
  }

  if (collapsed.has(node.id) || !node.children?.length) return

  let offsetX = x - getSubtreeWidth(node, collapsed) / 2

  node.children.forEach(child => {
    const width = getSubtreeWidth(child, collapsed)
    const childX = offsetX + width / 2

    buildTree(
      child,
      childX,
      y + LEVEL_HEIGHT,
      node.id,
      nodes,
      edges,
      collapsed
    )

    offsetX += width + SIBLING_GAP
  })
}

/* ---------------- FLOW CONTENT ---------------- */

function FlowContent({
  treeData,
  onNodeSelect,
  search,
  theme
}) {
  const [collapsed, setCollapsed] = useState(new Set())
  const { getNodes } = useReactFlow()

  const { nodes, edges } = useMemo(() => {
    const n = []
    const e = []
    buildTree(treeData, 0, 0, null, n, e, collapsed)
    return { nodes: n, edges: e }
  }, [treeData, collapsed])

  const styledNodes = nodes.map(n => {
    const isMatch =
      search &&
      n.data.label.toLowerCase().includes(search.toLowerCase())

    return {
      ...n,
      style: {
        ...n.style,
        background: isMatch
          ? '#ffc107'
          : theme === 'dark'
          ? '#1e1e1e'
          : '#ffffff',
        color: isMatch
          ? '#000'
          : theme === 'dark'
          ? '#ffffff'
          : '#000000',
        boxShadow: isMatch
          ? '0 0 12px rgba(255,193,7,0.8)'
          : 'none'
      }
    }
  })

  const onNodeClick = (_, node) => {
    onNodeSelect(node)

    if (!node.data.hasChildren) return

    setCollapsed(prev => {
      const next = new Set(prev)
      next.has(node.id)
        ? next.delete(node.id)
        : next.add(node.id)
      return next
    })
  }

  /* --------- EXPORT (EDGES INCLUDED) --------- */

  const exportImage = async () => {
    const bounds = getNodesBounds(getNodes())
    const viewport = getViewportForBounds(
      bounds,
      1400,
      900,
      0.1,
      2
    )

    const dataUrl = await toPng(
      document.querySelector('.react-flow__viewport'),
      {
        backgroundColor:
          theme === 'dark' ? '#0b0b0b' : '#ffffff',
        width: 1400,
        height: 900,
        style: {
          width: '1400px',
          height: '900px',
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`
        }
      }
    )

    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'mindmap.png'
    a.click()
  }

  return (
    <>
      <button
        className="btn btn-success btn-sm m-2"
        onClick={exportImage}
      >
        Export as Image
      </button>

      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        fitView
        onNodeClick={onNodeClick}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </>
  )
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function MindMap(props) {
  return (
    <div style={{ height: '85vh' }}>
      <ReactFlowProvider>
        <FlowContent {...props} />
      </ReactFlowProvider>
    </div>
  )
}

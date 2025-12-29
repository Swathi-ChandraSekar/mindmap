import { Handle, Position } from "reactflow";

export default function MindmapNode({ data }) {
  return (
    <div
      title={data.summary}   // 👈 tooltip
      style={{
        padding: "10px 18px",
        borderRadius: "14px",
        border: "1px solid #aaa",
        background: "var(--node-bg)",
        color: "var(--text)",
        minWidth: 160,
        textAlign: "center",
        cursor: "pointer"
      }}
    >
      <Handle type="target" position={Position.Top} />
      <strong>{data.label}</strong>
      {data.hasChildren && (
        <div style={{ fontSize: 10, opacity: 0.7 }}>expand / collapse</div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export function buildGraph(
  data,
  nodes = [],
  edges = [],
  parent = null,
  level = 0,
  index = 0,
  expanded = {}
) {
  if (parent && expanded[parent] === false) return { nodes, edges };

  const x = level * 260;
  const y = index * 140;

  nodes.push({
    id: data.id,
    data: {
      label: data.label,
      summary: data.summary,
      description: data.description,
      hasChildren: data.children.length > 0
    },
    position: { x, y },
    style: {
      padding: 10,
      borderRadius: 12,
      background: "var(--node-bg)",
      border: "1px solid #aaa",
      cursor: "pointer"
    }
  });

  if (parent) {
    edges.push({
      id: `${parent}-${data.id}`,
      source: parent,
      target: data.id
    });
  }

  data.children.forEach((child, i) =>
    buildGraph(child, nodes, edges, data.id, level + 1, i, expanded)
  );

  return { nodes, edges };
}

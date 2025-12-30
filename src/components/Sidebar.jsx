export default function Sidebar({ node, treeData, setTreeData }) {
  if (!node) {
    return <div className="p-3 text-muted">Select a node</div>
  }

  const updateNode = (tree) => {
    if (tree.id === node.id) {
      tree.label = node.data.label
      tree.description = node.data.description
    }
    tree.children?.forEach(updateNode)
  }

  const addNode = () => {
    addChildNode(treeData, node.id)
    setTreeData({ ...treeData })
  }

  const removeNode = () => {
    if (node.id === treeData.id) return
    deleteNode(treeData, node.id)
    setTreeData({ ...treeData })
  }

  return (
    <div className="p-3">
      <h6>Edit Node</h6>

      <input
        className="form-control mb-2"
        value={node.data.label}
        onChange={e => {
          node.data.label = e.target.value
          updateNode(treeData)
          setTreeData({ ...treeData })
        }}
      />

      <textarea
        className="form-control mb-2"
        rows={3}
        value={node.data.description}
        onChange={e => {
          node.data.description = e.target.value
          updateNode(treeData)
          setTreeData({ ...treeData })
        }}
      />

      <div className="d-flex gap-2">
        <button className="btn btn-success btn-sm" onClick={addNode}>
          ➕ Add Child
        </button>

        <button className="btn btn-danger btn-sm" onClick={removeNode}>
          🗑 Delete
        </button>
      </div>
    </div>
  )
}

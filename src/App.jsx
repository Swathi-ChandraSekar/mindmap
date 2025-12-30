import { useEffect, useState } from 'react'
import MindMap from './components/Mindmap'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import data from './data/roadmapData.json'

export default function App() {
  const [treeData, setTreeData] = useState(data)
  const [selectedNode, setSelectedNode] = useState(null)
  const [search, setSearch] = useState("")
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className="container-fluid vh-100">
      {/* Toolbar */}
      <div className="d-flex gap-2 p-2 border-bottom">
        <button className="btn btn-primary btn-sm" onClick={() => setTreeData({ ...treeData })}>
          Expand All
        </button>

        <button className="btn btn-secondary btn-sm">
          Collapse All
        </button>

        <button
          className="btn btn-outline-warning btn-sm"
          onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="row h-100">
        <div className="col-9 border-end">
          <MindMap
            treeData={treeData}
            setTreeData={setTreeData}
            onNodeSelect={setSelectedNode}
            search={search}
            theme={theme}
          />
        </div>
        <div className="col-3">
          <Sidebar
            node={selectedNode}
            treeData={treeData}
            setTreeData={setTreeData}
          />
        </div>
      </div>
    </div>
  )
}

import { useState } from "react";
import Mindmap from "./components/Mindmap";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import "./index.css";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [dark, setDark] = useState(true);

  /**
   * Called when a node is clicked in Mindmap
   */
  const handleSelect = (node) => {
    setSelected(node);

    // Build breadcrumb from parent chain
    const path = [];
    let current = node;

    while (current) {
      path.unshift(current.label);
      current = current.parent;
    }

    setBreadcrumb(path);
  };

  return (
    <div className={dark ? "dark" : "light"}>
      {/* Header */}
      <header>
        <h1>Interactive Mindmap</h1>

        <label className="switch">
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark(!dark)}
          />
          <span className="slider" />
        </label>
      </header>

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumb} />

      {/* Main Layout */}
      <div className="layout">
        <div className="canvas">
          <Mindmap onSelect={handleSelect} />
        </div>

        <aside>
          <Sidebar node={selected} />
        </aside>
      </div>
    </div>
  );
}

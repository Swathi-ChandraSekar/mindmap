import { toPng } from "html-to-image";

export default function Navbar({ dark, toggleTheme }) {
  const exportImage = () => {
    const node = document.querySelector(".react-flow");
    toPng(node).then(dataUrl => {
      const link = document.createElement("a");
      link.download = "mindmap.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="navbar">
      <h3>Interactive Mindmap</h3>

      <div>
        <button onClick={exportImage}>📸 Export</button>
        <label className="switch">
          <input type="checkbox" checked={dark} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}

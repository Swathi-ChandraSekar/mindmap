Interactive Mindmap UI Overview

    This is an interactive, data-driven Mindmap UI built with React. It visualizes hierarchical data as a vertical tree and supports node interactions, searching, theme switching, and exporting the mindmap as an image. The UI is generated entirely from JSON data.

Features:
    Data-driven rendering from JSON,
    Vertical hierarchical mindmap layout,
    Expand/collapse nodes,
    Node editing,
    Search and highlight,
    Dark/Light theme toggle,
    Fit view and zoom controls,
    Export mindmap as PNG,
    Advanced features (expand all/collapse all, add/delete nodes) in development

Technologies:
    React, Vite, React Flow, Bootstrap, html-to-image

Project Structure:

mindmap-ui/
├── src/
│   ├── components/ (MindMap, Sidebar, SearchBar)
│   ├── data/ (roadmapData.json)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── README.md

Running the Project:
    npm install
    npm run dev

Open the browser at http://localhost:5173.

Author:
    Swathi Chandra Sekar

License:
    Created for educational and demonstration purpose.

import React from "react";
import ShapeControls from "./app/components/shapeControl";
import ShapeEditorCanvas from "./app/components/shapeCanvas";
import LayerPanel from "./app/components/shapeLayerPanel";
import ToolBar from "./app/components/toolbar";

const App: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <ToolBar />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          backgroundColor: "#f2f2f2",
          overflow: "auto",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Shape Editor App
        </h1>
        <ShapeControls />
        <ShapeEditorCanvas />
      </div>
      <LayerPanel />
    </div>
  );
};

export default App;

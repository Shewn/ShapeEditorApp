import React from "react";
import ShapeControls from "./app/components/shapeControl";
import ShapeEditorCanvas from "./app/components/shapeCanvas";
import LayerPanel from "./app/components/shapeLayerPanel";

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Shape & Image Editor</h1>
      <ShapeControls />
      <div style={{ display: "flex", alignItems: "flex-start", marginTop: 10 }}>
        <ShapeEditorCanvas />
        <LayerPanel />
      </div>
    </div>
  );
};

export default App;

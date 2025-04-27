import React from "react";
import { observer } from "mobx-react-lite";
import { shapeStore } from "../stores/store";

const ShapeControls: React.FC = observer(() => {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 20,
        justifyContent: "center",
      }}
    >
      <button
        onClick={shapeStore.clearShapes}
        style={{
          padding: "8px 16px",
          backgroundColor: "#ff4d4f",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontSize: 14,
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
      >
        Clear Canvas
      </button>

      <button
        onClick={shapeStore.undo}
        style={{
          padding: "8px 16px",
          backgroundColor: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontSize: 14,
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
      >
        Undo
      </button>
    </div>
  );
});

export default ShapeControls;

import React from "react";
import { observer } from "mobx-react-lite";
import { shapeStore } from "../stores/store";

const ShapeLayerPanel: React.FC = observer(() => {
  return (
    <div
      style={{
        width: 180,
        marginLeft: 20,
        border: "1px solid #ccc",
        borderRadius: 6,
        padding: 10,
        background: "#f9f9f9",
        fontFamily: "monospace",
        fontSize: 14,
      }}
    >
      <h3 style={{ marginTop: 0 }}>Layers</h3>
      {shapeStore.shapes.length === 0 ? (
        <p style={{ color: "#aaa" }}>No layers</p>
      ) : (
        shapeStore.shapes.map((shape) => (
          <div
            key={shape.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              [{shape.id}] {shape.type}
            </span>
            <button
              onClick={() => shapeStore.removeShapeById(shape.id)}
              style={{
                border: "none",
                background: "transparent",
                color: "#b00",
                cursor: "pointer",
              }}
              title="Delete layer"
            >
              ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
});

export default ShapeLayerPanel;

import React from "react";
import { observer } from "mobx-react-lite";
import { shapeStore } from "../stores/store";
import { ShapeType } from "../interfaces/shapes";
import {
  BrushIcon,
  CircleIcon,
  FillIcon,
  ImageIcon,
  RectIcon,
} from "../interfaces/toolIcons";

const tools = [
  { type: "brush" as ShapeType, icon: BrushIcon, label: "Brush" },
  { type: "fill" as ShapeType, icon: FillIcon, label: "Fill" },
  { type: "rect" as ShapeType, icon: RectIcon, label: "Rectangle" },
  { type: "circle" as ShapeType, icon: CircleIcon, label: "Circle" },
  { type: "image" as ShapeType, icon: ImageIcon, label: "Image" },
];

const ToolBar: React.FC = observer(() => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: 10,
        borderRight: "1px solid #ccc",
        backgroundColor: "#f8f8f8",
        height: "100%",
      }}
    >
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = shapeStore.selectedShapeType === tool.type;

        return (
          <button
            key={tool.type}
            onClick={() => shapeStore.setShapeType(tool.type)}
            title={tool.label}
            style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              backgroundColor: isActive ? "#d0d0d0" : "#fff",
              border: isActive ? "2px solid #007bff" : "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <Icon />
          </button>
        );
      })}

      <div
        style={{
          width: "80%",
          height: 1,
          backgroundColor: "#ccc",
          margin: "10px 0",
        }}
      />

      <input
        type="color"
        title="Pick Color"
        value={shapeStore.selectedColor}
        onChange={(e) => shapeStore.setColor(e.target.value)}
        style={{
          width: 36,
          height: 36,
          border: "none",
          padding: 0,
          background: "none",
          cursor: "pointer",
        }}
      />
    </div>
  );
});

export default ToolBar;

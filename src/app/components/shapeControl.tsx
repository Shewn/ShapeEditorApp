import React, { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { shapeStore } from "../stores/store";
import { FaPaintbrush, FaFillDrip } from "react-icons/fa6";
import { ShapeType } from "../interfaces/shapes";

const BrushIcon = FaPaintbrush as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
const FillIcon = FaFillDrip as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

const ShapeControls: React.FC = observer(() => {
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target?.result as string;
      img.onload = () => {
        shapeStore.setUploadedImage(img);
        shapeStore.setShapeType("image");
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ marginBottom: 10 }}>
      {/* 🎯 Top Toolbar: Brush and Fill buttons */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <button
          onClick={() => shapeStore.setShapeType("brush")}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 10,
            padding: "6px 12px",
            backgroundColor:
              shapeStore.selectedShapeType === "brush" ? "#ddd" : "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          <BrushIcon style={{ marginRight: 6 }} />
          Brush
        </button>

        <button
          onClick={() => shapeStore.setShapeType("fill")}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 10,
            padding: "6px 12px",
            backgroundColor:
              shapeStore.selectedShapeType === "fill" ? "#ddd" : "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          <FillIcon style={{ marginRight: 6 }} />
          Fill
        </button>
      </div>

      {/* 🎯 Shape Selection Dropdown */}
      <div style={{ marginBottom: 10 }}>
        <label>
          Shape:
          <select
            value={shapeStore.selectedShapeType}
            onChange={(e) =>
              shapeStore.setShapeType(e.target.value as ShapeType)
            }
            style={{ margin: "0 10px" }}
          >
            <option value="rect">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="image">Image</option>
          </select>
        </label>
      </div>

      {/* 🎨 Color Picker (shared for everything) */}
      {shapeStore.selectedShapeType !== "image" && (
        <div style={{ marginBottom: 10 }}>
          <label>
            Color:
            <input
              type="color"
              value={shapeStore.selectedColor}
              onChange={(e) => shapeStore.setColor(e.target.value)}
              style={{ marginLeft: 10 }}
            />
          </label>
        </div>
      )}

      {/* 📷 Image Upload */}
      <div style={{ marginBottom: 10 }}>
        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      {/* 🧹 Clear + Undo Buttons */}
      <div>
        <button
          onClick={() => shapeStore.clearShapes()}
          style={{ marginRight: 10 }}
        >
          Clear Canvas
        </button>
        <button onClick={() => shapeStore.undo()}>Undo</button>
      </div>
    </div>
  );
});

export default ShapeControls;

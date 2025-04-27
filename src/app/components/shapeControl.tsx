import React, { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { shapeStore } from "../stores/store";
import { ShapeType } from "../interfaces/shapes";

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
      <label>
        Shape:
        <select
          value={shapeStore.selectedShapeType}
          onChange={(e) => shapeStore.setShapeType(e.target.value as ShapeType)}
          style={{ margin: "0 10px" }}
        >
          <option value="rect">Rectangle</option>
          <option value="circle">Circle</option>
          <option value="image">Image</option>
        </select>
      </label>

      {shapeStore.selectedShapeType !== "image" && (
        <label style={{ marginLeft: 10 }}>
          Color:
          <input
            type="color"
            value={shapeStore.selectedColor}
            onChange={(e) => shapeStore.setColor(e.target.value)}
            style={{ marginLeft: 10 }}
          />
        </label>
      )}

      <label style={{ marginLeft: 20 }}>
        Upload Image:
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>

      <button
        onClick={() => shapeStore.clearShapes()}
        style={{ marginLeft: 10 }}
      >
        Clear Canvas
      </button>

      <button onClick={() => shapeStore.undo()} style={{ marginLeft: 10 }}>
        Undo
      </button>
    </div>
  );
});

export default ShapeControls;

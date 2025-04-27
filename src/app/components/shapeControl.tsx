import React, { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { shapeStore } from "../stores/store";

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
      };
    };

    reader.readAsDataURL(file);
  };
  return (
    <div>
      {shapeStore.selectedShapeType === "image" && (
        <div
          style={{
            display: "flex",
            gap: 10,
            marginInline: "auto",
            marginBottom: 20,
            justifyContent: "center",
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <label>
              Upload Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => shapeStore.clearShapes()}
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
          onClick={() => shapeStore.undo()}
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
    </div>
  );
});

export default ShapeControls;

import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { shapeStore } from "../stores/store";

const ShapeEditorCanvas: React.FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    draw();
  }, [shapeStore.shapes.length]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapeStore.shapes.forEach((shape) => {
      ctx.beginPath();
      if (shape.type === "rect") {
        ctx.fillStyle = shape.color;
        ctx.fillRect(
          shape.x - shape.width / 2,
          shape.y - shape.height / 2,
          shape.width,
          shape.height
        );
      } else if (shape.type === "circle") {
        ctx.fillStyle = shape.color;
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (shape.type === "image") {
        ctx.drawImage(
          shape.image,
          shape.x - shape.width / 2,
          shape.y - shape.height / 2,
          shape.width,
          shape.height
        );
      }
      ctx.closePath();
    });
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { x, y } = getMousePos(e);
    shapeStore.addShapeAt(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid black", cursor: "crosshair" }}
      onClick={handleClick}
    />
  );
});

export default ShapeEditorCanvas;

import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { shapeStore } from "../stores/store";

const ShapeEditorCanvas: React.FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

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
      if (shape.type === "fill") {
        ctx.fillStyle = shape.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    });

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
      } else if (shape.type === "brush") {
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 4;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        const points = shape.points;
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
          }
          ctx.stroke();
        }
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
    if (shapeStore.selectedShapeType !== "brush") {
      const { x, y } = getMousePos(e);
      shapeStore.addShapeAt(x, y);
    }
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (shapeStore.selectedShapeType === "brush") {
      const pos = getMousePos(e);
      shapeStore.addShapeAt(pos.x, pos.y);
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing) return;
    const pos = getMousePos(e);
    const lastShape = shapeStore.shapes[shapeStore.shapes.length - 1];
    if (lastShape && lastShape.type === "brush") {
      lastShape.points.push(pos);
      draw();
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      style={{
        width: "800px",
        height: "600px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black", cursor: "crosshair" }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
});

export default ShapeEditorCanvas;

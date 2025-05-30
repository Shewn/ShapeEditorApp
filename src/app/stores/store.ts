import { makeAutoObservable } from "mobx";
import { Shape, ShapeType } from "../interfaces/shapes";

class ShapeStore {
  shapes: Shape[] = [];
  nextId = 1;
  selectedShapeType: ShapeType = null;
  selectedColor: string = "#ff0000";
  uploadedImage: HTMLImageElement | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setShapeType(type: ShapeType) {
    if (this.selectedShapeType === type) {
      this.selectedShapeType = null;
      this.uploadedImage = null;
      return;
    }
    this.selectedShapeType = type;
  }

  setColor(color: string) {
    this.selectedColor = color;
  }

  setUploadedImage(image: HTMLImageElement) {
    this.uploadedImage = image;
  }

  addShapeAt(x: number, y: number) {
    const id = this.nextId++;

    if (this.selectedShapeType === "image") {
      if (!this.uploadedImage) return;
      this.shapes.push({
        id,
        type: "image",
        x,
        y,
        image: this.uploadedImage,
        width: 100,
        height: 100,
      });
      return;
    }

    if (this.selectedShapeType === "fill") {
      this.shapes.push({
        id,
        type: "fill",
        color: this.selectedColor,
      });
      return;
    }

    if (this.selectedShapeType === "brush") {
      this.shapes.push({
        id,
        type: "brush",
        points: [{ x, y }],
        color: this.selectedColor,
      });
      return;
    }

    const shape: Shape =
      this.selectedShapeType === "rect"
        ? {
            id,
            type: "rect",
            x,
            y,
            width: 80,
            height: 60,
            color: this.selectedColor,
          }
        : { id, type: "circle", x, y, radius: 30, color: this.selectedColor };

    this.shapes.push(shape);
  }

  removeShapeById(id: number) {
    this.shapes = this.shapes.filter((shape) => shape.id !== id);
  }

  undo() {
    this.shapes.pop();
  }

  clearShapes() {
    this.shapes = [];
  }
}

export const shapeStore = new ShapeStore();

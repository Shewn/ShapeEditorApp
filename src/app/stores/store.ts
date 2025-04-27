import { makeAutoObservable } from "mobx";
import { Shape, ShapeType } from "../interfaces/shapes";

class ShapeStore {
  shapes: Shape[] = [];
  nextId = 1;
  selectedShapeType: ShapeType = "rect";
  selectedColor: string = "#ff0000";
  uploadedImage: HTMLImageElement | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setShapeType(type: ShapeType) {
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

    if (this.selectedShapeType === "image" && this.uploadedImage) {
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

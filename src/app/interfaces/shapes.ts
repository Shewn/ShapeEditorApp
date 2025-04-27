export type ShapeType = "rect" | "circle" | "image";

export interface RectShape {
  id: number;
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface CircleShape {
  id: number;
  type: "circle";
  x: number;
  y: number;
  radius: number;
  color: string;
}

export interface ImageShape {
  id: number;
  type: "image";
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
}

export type Shape = RectShape | CircleShape | ImageShape;

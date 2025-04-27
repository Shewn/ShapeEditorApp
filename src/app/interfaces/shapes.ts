export type ShapeType = "rect" | "circle" | "image" | "brush" | "fill";

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

export interface BrushStroke {
  id: number;
  type: "brush";
  points: { x: number; y: number }[];
  color: string;
}

export interface FillShape {
  id: number;
  type: "fill";
  color: string;
}

export type Shape =
  | RectShape
  | CircleShape
  | ImageShape
  | BrushStroke
  | FillShape;

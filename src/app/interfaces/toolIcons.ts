import {
  FaPaintbrush,
  FaFillDrip,
  FaRegSquare,
  FaRegCircle,
  FaImage,
} from "react-icons/fa6";

export const BrushIcon = FaPaintbrush as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
export const FillIcon = FaFillDrip as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
export const RectIcon = FaRegSquare as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
export const CircleIcon = FaRegCircle as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;
export const ImageIcon = FaImage as unknown as React.FC<
  React.SVGProps<SVGSVGElement>
>;

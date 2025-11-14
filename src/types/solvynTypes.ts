export type IconId = "tax" | "climate" | "treasury" | "atlas" | "elements" | "payments" | "windmill" | "solar" | "battery" | "forecasting" | "trading" | "reporting" | "bidopt";

export type IconState = {
  id: IconId;
  label: string;
  ref: React.RefObject<HTMLDivElement | null>;
  active: boolean;
};

export type Point = {
  x: number;
  y: number;
};

export type Points = {
  origin: Point;
  targets: Point[];
};

export const ICON_SIZE = 48;
export const BEAM_SPEED = 0.2; // Speed of pulse animation (increased for faster movement)
export const TOUCH_THRESHOLD = 25;


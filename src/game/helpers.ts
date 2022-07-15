export const DEGREE_IN_RADIANS = 0.0174533;

export interface Coordinates {
  x: number;
  y: number
}

export function degreeToCoordiantes(angle: number, radius: number): Coordinates {
  const pointAngleInRadians = angle * DEGREE_IN_RADIANS;
  return {x: Math.cos(pointAngleInRadians) * radius,
  y: Math.sin(pointAngleInRadians) * radius}
}

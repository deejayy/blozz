export type Board = number[][];
export type Piece = number[][];
export type Coord = { x: number; y: number };

export const PLACE_STATE = 0b00000001;
export const HOVER_STATE = 0b00000010;
export const HOVER_MATCH_STATE = 0b00000100;
export const MINI_GRID_SIZE = 3;
export const TOUCH_DISTANCE = 100;
export const BOX_SIZE = 40;

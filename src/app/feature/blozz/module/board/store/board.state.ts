import { Board, Coord } from '@feature/blozz/module/board/model/board.model';

export interface BoardState {
  width: number;
  height: number;
  board: Board;
  corner: Coord;
}

export const initialBoardState: BoardState = {
  width: 9,
  height: 9,
  board: [],
  corner: { x: 0, y: 0 },
};

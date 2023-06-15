import { Piece, Coord } from '@feature/blozz/module/board/model/board.model';

export interface DeckState {
  pieces: Piece[];
  disabledPieces: boolean[];
  activePiece: number | undefined;
  startCoords: Coord;
  outOfPieces: boolean | undefined;
}

export const initialDeckState: DeckState = {
  pieces: [],
  disabledPieces: [],
  activePiece: undefined,
  startCoords: { x: 0, y: 0 },
  outOfPieces: undefined,
};

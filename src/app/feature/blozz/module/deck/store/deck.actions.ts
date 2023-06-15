import { Board, Coord, Piece } from '@feature/blozz/module/board/model/board.model';
import { createAction, props } from '@ngrx/store';

export class DeckActions {
  public static removePiece = createAction('[Deck] Remove Piece', props<{ pieceNum: number }>());
  public static setPieces = createAction('[Deck] Set Pieces', props<{ pieces: Piece[] }>());
  public static setActivePiece = createAction('[Deck] Set Active Piece', props<{ pieceNum: number }>());
  public static disablePiece = createAction('[Deck] Disable Piece', props<{ pieceNum: number }>());
  public static checkPieces = createAction('[Deck] Check Pieces', props<{ board: Board }>());
  public static clearActivePiece = createAction('[Deck] Clear Active Piece');
  public static setStartCoords = createAction('[Deck] Set Start Coordinates', props<{ coords: Coord }>());
}

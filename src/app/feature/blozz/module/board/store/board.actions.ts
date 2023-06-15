import { Board, Coord, Piece } from '@feature/blozz/module/board/model/board.model';
import { createAction, props } from '@ngrx/store';

export class BoardActions {
  public static setCorner = createAction('[Board] Set Corner', props<{ corner: Coord }>());
  public static setWidth = createAction('[Board] Set Width', props<{ payload: number }>());
  public static setHeight = createAction('[Board] Set Height', props<{ payload: number }>());
  public static clearBoard = createAction('[Board] Clear Board');
  public static setBoard = createAction('[Board] Set Board', props<{ board: Board }>());
  public static clearHover = createAction('[Board] Clear Hover');
  public static placeItem = createAction('[Board] Place Item', props<{ piece: Piece; col: number; row: number }>());
  public static removeRow = createAction('[Board] Remove Row', props<{ payload: number }>());
  public static removeColumn = createAction('[Board] Remove Column', props<{ payload: number }>());
  public static removeBlock = createAction('[Board] Remove Block', props<{ start: Coord; end: Coord }>());
}

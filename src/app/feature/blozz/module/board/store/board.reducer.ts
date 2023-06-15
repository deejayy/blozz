import { convertBoard, placePiece, removeBlock, removeColumn, removeRow } from '@feature/blozz/module/board/helper/board.helper';
import { HOVER_STATE } from '@feature/blozz/module/board/model/board.model';
import { BoardActions } from '@feature/blozz/module/board/store/board.actions';
import { initialBoardState } from '@feature/blozz/module/board/store/board.state';
import { createFeature, createReducer } from '@ngrx/store';
import { produceOn } from '@shared/helper/produce-on';

const boardReducer = createReducer(
  initialBoardState,
  produceOn(BoardActions.setWidth, (state, action) => {
    state.width = action.payload;
  }),
  produceOn(BoardActions.setCorner, (state, action) => {
    state.corner = action.corner;
  }),
  produceOn(BoardActions.setHeight, (state, action) => {
    state.height = action.payload;
  }),
  produceOn(BoardActions.clearBoard, (state) => {
    state.board = convertBoard('', state.width, state.height);
  }),
  produceOn(BoardActions.setBoard, (state, action) => {
    state.board = action.board;
  }),
  produceOn(BoardActions.clearHover, (state) => {
    state.board = state.board.map((row) => row.map((cell) => (cell === HOVER_STATE ? 0 : cell)));
  }),
  produceOn(BoardActions.placeItem, (state, action) => {
    state.board = placePiece(state.board, action.piece, action.col, action.row);
  }),
  produceOn(BoardActions.removeRow, (state, action) => {
    state.board = removeRow(state.board, action.payload);
  }),
  produceOn(BoardActions.removeColumn, (state, action) => {
    state.board = removeColumn(state.board, action.payload);
  }),
  produceOn(BoardActions.removeBlock, (state, action) => {
    state.board = removeBlock(state.board, action.start, action.end);
  }),
);

export const boardFeature = createFeature({
  name: 'board',
  reducer: boardReducer,
});

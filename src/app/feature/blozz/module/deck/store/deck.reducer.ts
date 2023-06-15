import { pieceCanBePlaced } from '@feature/blozz/module/board/helper/board.helper';
import { DeckActions } from '@feature/blozz/module/deck/store/deck.actions';
import { initialDeckState } from '@feature/blozz/module/deck/store/deck.state';
import { createSelector, createFeature, createReducer } from '@ngrx/store';
import { produceOn } from '@shared/helper/produce-on';

const deckReducer = createReducer(
  initialDeckState,
  produceOn(DeckActions.setPieces, (state, action) => {
    state.pieces = action.pieces;
    state.disabledPieces = Array.from({ length: action.pieces.length }, () => false);
    state.outOfPieces = false;
  }),
  produceOn(DeckActions.disablePiece, (state, action) => {
    state.disabledPieces[action.pieceNum] = true;
  }),
  produceOn(DeckActions.setActivePiece, (state, action) => {
    if (!state.disabledPieces[action.pieceNum]) {
      state.activePiece = action.pieceNum;
    }
  }),
  produceOn(DeckActions.clearActivePiece, (state) => {
    state.activePiece = undefined;
  }),
  produceOn(DeckActions.removePiece, (state, action) => {
    state.pieces[action.pieceNum] = [];
    state.disabledPieces[action.pieceNum] = true;
    if (state.pieces.every((piece) => piece.length === 0)) {
      state.outOfPieces = true;
    }
  }),
  produceOn(DeckActions.setStartCoords, (state, action) => {
    state.startCoords = action.coords;
  }),
  produceOn(DeckActions.checkPieces, (state, action) => {
    state.pieces.forEach((piece, idx) => {
      state.disabledPieces[idx] = piece.length === 0 || !pieceCanBePlaced(action.board, piece);
    });
  }),
);

export const deckFeature = createFeature({
  name: 'deck',
  reducer: deckReducer,
  extraSelectors: ({ selectOutOfPieces, selectDisabledPieces }) => ({
    selectGameOver: createSelector(
      selectOutOfPieces,
      selectDisabledPieces,
      (outOfPieces, disabledPieces) => outOfPieces === false && disabledPieces.every((piece) => piece === true),
    ),
  }),
});

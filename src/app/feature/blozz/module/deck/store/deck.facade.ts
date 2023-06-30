import { Injectable } from '@angular/core';
import { Board, Coord, Piece } from '@feature/blozz/module/board/model/board.model';
import { DeckActions } from '@feature/blozz/module/deck/store/deck.actions';
import { deckFeature } from '@feature/blozz/module/deck/store/deck.reducer';
import { DeckState } from '@feature/blozz/module/deck/store/deck.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class DeckFacade {
  public pieceList$: Observable<Piece[]> = this.store.select(deckFeature.selectPieces);
  public activePiece$: Observable<number | undefined> = this.store.select(deckFeature.selectActivePiece);
  public startCoords$: Observable<Coord> = this.store.select(deckFeature.selectStartCoords);
  public outOfPieces$: Observable<boolean | undefined> = this.store.select(deckFeature.selectOutOfPieces);
  public disabledPieces$: Observable<boolean[]> = this.store.select(deckFeature.selectDisabledPieces);
  public gameOver$: Observable<boolean> = this.store.select(deckFeature.selectGameOver);

  constructor(private store: Store<DeckState>) {}

  public removePiece(pieceNum: number) {
    this.store.dispatch(DeckActions.removePiece({ pieceNum }));
  }

  public rotatePiece(pieceNum: number) {
    this.store.dispatch(DeckActions.rotatePiece({ pieceNum }));
  }

  public setPieces(pieces: Piece[]) {
    this.store.dispatch(DeckActions.setPieces({ pieces }));
  }

  public setActivePiece(pieceNum: number) {
    this.store.dispatch(DeckActions.setActivePiece({ pieceNum }));
  }

  public disablePiece(pieceNum: number) {
    this.store.dispatch(DeckActions.disablePiece({ pieceNum }));
  }

  public checkPieces(board: Board) {
    this.store.dispatch(DeckActions.checkPieces({ board }));
  }

  public clearActivePiece() {
    this.store.dispatch(DeckActions.clearActivePiece());
  }

  public setStartCoords(coords: Coord) {
    this.store.dispatch(DeckActions.setStartCoords({ coords }));
  }
}

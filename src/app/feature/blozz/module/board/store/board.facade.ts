import { Injectable } from '@angular/core';
import { hoverPiece } from '@feature/blozz/module/board/helper/board.helper';
import { Board, Coord, Piece } from '@feature/blozz/module/board/model/board.model';
import { BoardActions } from '@feature/blozz/module/board/store/board.actions';
import { boardFeature } from '@feature/blozz/module/board/store/board.reducer';
import { BoardState } from '@feature/blozz/module/board/store/board.state';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, debounceTime, map, Observable } from 'rxjs';

@Injectable()
export class BoardFacade {
  private hover$: BehaviorSubject<{ piece: Piece; row: number; col: number }> = new BehaviorSubject<{
    piece: Piece;
    row: number;
    col: number;
  }>({ piece: [], row: 0, col: 0 });

  public corner$: Observable<Coord> = this.store.select(boardFeature.selectCorner);
  public width$: Observable<number> = this.store.select(boardFeature.selectWidth);
  public height$: Observable<number> = this.store.select(boardFeature.selectHeight);
  public rawBoard$: Observable<Board> = this.store.select(boardFeature.selectBoard);
  public board$: Observable<Board> = combineLatest([this.store.select(boardFeature.selectBoard), this.hover$]).pipe(
    debounceTime(0),
    map(([board, hoverInfo]) => hoverPiece(board, hoverInfo.piece, hoverInfo.row, hoverInfo.col)),
  );

  constructor(private store: Store<BoardState>) {}

  public setWidth(width: number) {
    this.store.dispatch(BoardActions.setWidth({ payload: width }));
  }

  public setCorner(corner: Coord) {
    this.store.dispatch(BoardActions.setCorner({ corner }));
  }

  public setHeight(height: number) {
    this.store.dispatch(BoardActions.setHeight({ payload: height }));
  }

  public clearBoard() {
    this.store.dispatch(BoardActions.clearBoard());
  }

  public clearHover() {
    this.store.dispatch(BoardActions.clearHover());
  }

  public hoverItem(piece: Piece, row: number, col: number) {
    this.hover$.next({ piece, row, col });
  }

  public placeItem(piece: Piece, col: number, row: number) {
    this.hover$.next({ piece: [], row, col });
    this.store.dispatch(BoardActions.placeItem({ piece, col, row }));
  }

  public setBoard(board: Board) {
    this.store.dispatch(BoardActions.setBoard({ board }));
  }

  public removeRow(row: number) {
    this.store.dispatch(BoardActions.removeRow({ payload: row }));
  }

  public removeColumn(row: number) {
    this.store.dispatch(BoardActions.removeColumn({ payload: row }));
  }

  public removeBlock(topLeft: Coord, bottomRight: Coord) {
    this.store.dispatch(BoardActions.removeBlock({ start: topLeft, end: bottomRight }));
  }
}

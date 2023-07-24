import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { environment } from '@env/environment';
import {
  checkBlocks,
  checkColumns,
  checkRows,
  getDragCoords,
  hasOverlap,
  pieceValue,
} from '@feature/blozz/module/board/helper/board.helper';
import { Board, MINI_GRID_SIZE } from '@feature/blozz/module/board/model/board.model';
import { BoardFacade } from '@feature/blozz/module/board/store/board.facade';
import { DeckFacade } from '@feature/blozz/module/deck/store/deck.facade';
import { ScoreFacade } from '@feature/blozz/module/score/store/score.facade';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';
import { debounceTime, delay, filter, fromEvent, map, Observable, of, Subscription, switchMap, take, withLatestFrom } from 'rxjs';

export const BOARD_WIDTH = 9;
export const BOARD_HEIGHT = 9;
export const SCORE_MULTI = 2;
export const SCORE_COMBO = 2;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('board') public boardElem!: ElementRef<HTMLElement>;

  public board$: Observable<Board> = this.boardFacade.board$;
  public activePiece$: Observable<number | undefined> = this.deckFacade.activePiece$;

  public drop$: Observable<{ event: DragEvent }> = of();
  public dragOver$: Observable<{ event: DragEvent }> = of();

  private subs: Subscription = new Subscription();

  constructor(
    private boardFacade: BoardFacade,
    private deckFacade: DeckFacade,
    private scoreFacade: ScoreFacade,
    private settingsFacade: SettingsFacade,
  ) {
    this.startGame();
  }

  private startGame() {
    this.settingsFacade.gameMode$.pipe(take(1)).subscribe((gameMode) => this.scoreFacade.resetScore(gameMode));
    this.boardFacade.clearBoard();
    if (!environment.production) {
      this.boardFacade.setBoard(
        // eslint-disable-next-line no-magic-numbers
        Array.from({ length: BOARD_HEIGHT }, () => Array.from({ length: BOARD_WIDTH }, () => Math.round(Math.random() + 0.1))),
      );
    }
  }

  // eslint-disable-next-line max-lines-per-function
  public ngAfterViewInit(): void {
    this.dragOver$ = fromEvent<DragEvent>(this.boardElem.nativeElement, 'dragover').pipe(map((event) => ({ event })));
    this.drop$ = fromEvent<DragEvent>(this.boardElem.nativeElement, 'drop').pipe(map((event) => ({ event })));

    this.subs.add(
      this.boardFacade.rawBoard$.pipe(withLatestFrom(this.settingsFacade.tetrisMode$)).subscribe(([board, tetrisMode]) => {
        this.boardFacade.setCorner({
          x: this.boardElem.nativeElement.offsetLeft,
          y: this.boardElem.nativeElement.offsetTop,
        });

        const removals: { rows: number[]; columns: number[]; blocks: { col: number; row: number }[] } = {
          rows: [],
          columns: [],
          blocks: [],
        };

        const collectRows = (idx: number) => removals.rows.push(idx);
        const collectColumns = (idx: number) => removals.columns.push(idx);
        const collectBlocks = (row: number, col: number) => removals.blocks.push({ col, row });

        checkRows(board, collectRows);
        checkColumns(board, collectColumns);
        checkBlocks(board, collectBlocks);

        removals.rows.forEach((rowIndex: number) => this.boardFacade.removeRow(rowIndex));
        removals.columns.forEach((columnIndex: number) => this.boardFacade.removeColumn(columnIndex));
        removals.blocks.forEach(({ col, row }) =>
          this.boardFacade.removeBlock({ x: col, y: row }, { x: col + MINI_GRID_SIZE - 1, y: row + MINI_GRID_SIZE - 1 }),
        );

        const rowsMatch = removals.rows.length * SCORE_MULTI;
        const colsMatch = removals.columns.length * SCORE_MULTI;
        const boxesMatch = removals.blocks.length * SCORE_MULTI;

        if (rowsMatch + colsMatch + boxesMatch > 0) {
          this.scoreFacade.addScore(BOARD_WIDTH * (rowsMatch + colsMatch + boxesMatch) ** SCORE_MULTI);
          if (!tetrisMode) {
            this.scoreFacade.addMultiplier(SCORE_COMBO + removals.rows.length + removals.columns.length + removals.blocks.length);
          }
        }

        this.deckFacade.checkPieces(board, tetrisMode);
      }),
    );

    this.subs.add(this.deckFacade.gameOver$.pipe(debounceTime(0), filter(Boolean), delay(0)).subscribe(() => this.startGame()));

    const baseInfo$ = this.boardFacade.corner$.pipe(
      switchMap((corner) => {
        return this.boardFacade.board$.pipe(
          switchMap((board) => {
            return this.deckFacade.pieceList$.pipe(
              switchMap((pieceList) => {
                return this.activePiece$.pipe(
                  filter((activePiece) => activePiece !== undefined),
                  switchMap((activePiece) => {
                    return this.deckFacade.startCoords$.pipe(
                      map((coords) => ({ piece: pieceList[activePiece!]!, coords, activePiece, board, corner })),
                    );
                  }),
                );
              }),
            );
          }),
        );
      }),
    );

    this.subs.add(
      baseInfo$.pipe(switchMap((baseInfo) => this.dragOver$.pipe(map((v) => ({ ...baseInfo, ...v }))))).subscribe((dragInfo) => {
        const { row, col } = getDragCoords(dragInfo.event, dragInfo.coords);

        if (!hasOverlap(dragInfo.board, dragInfo.piece, row, col)) {
          this.boardFacade.hoverItem(dragInfo.piece, row, col);
        } else {
          this.boardFacade.hoverItem([], 0, 0);
        }

        dragInfo.event.preventDefault();
      }),
    );

    this.subs.add(
      baseInfo$.pipe(switchMap((baseInfo) => this.drop$.pipe(map((v) => ({ ...baseInfo, ...v }))))).subscribe((dragInfo) => {
        const { row, col } = getDragCoords(dragInfo.event, dragInfo.coords);

        if (!hasOverlap(dragInfo.board, dragInfo.piece, row, col)) {
          this.boardFacade.placeItem(dragInfo.piece, row, col);
          this.deckFacade.removePiece(dragInfo.activePiece!);
          this.scoreFacade.addScore(pieceValue(dragInfo.piece));
        } else {
          this.boardFacade.hoverItem([], 0, 0);
          this.deckFacade.clearActivePiece();
          this.boardFacade.clearHover();
        }

        dragInfo.event.preventDefault();
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

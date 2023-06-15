import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { hasOverlap, pieceValue } from '@feature/blozz/module/board/helper/board.helper';
import { Piece, TOUCH_DISTANCE } from '@feature/blozz/module/board/model/board.model';
import { BoardFacade } from '@feature/blozz/module/board/store/board.facade';
import { generatePiece, getTargetTouch, getTouchCoords } from '@feature/blozz/module/deck/helper/deck.helper';
import { DeckFacade } from '@feature/blozz/module/deck/store/deck.facade';
import { ScoreFacade } from '@feature/blozz/module/score/store/score.facade';
import { debounceTime, delay, filter, fromEvent, map, merge, Observable, of, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeckComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('pieceWrapper') public pieceWrappers!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('piece') public pieces!: QueryList<ElementRef<HTMLElement>>;

  public pieceList$: Observable<Piece[]> = this.deckFacade.pieceList$;
  public disabledPieces$: Observable<boolean[]> = this.deckFacade.disabledPieces$;
  public activePiece$: Observable<number | undefined> = this.deckFacade.activePiece$;

  public dragStart$: Observable<{ event: MouseEvent; item: ElementRef<HTMLElement>; idx: number }> = of();
  public dragEnd$: Observable<void> = of();

  public touchStart$: Observable<{ event: TouchEvent; item: ElementRef<HTMLElement>; idx: number }> = of();
  public touchMove$: Observable<{ event: TouchEvent; item: ElementRef<HTMLElement>; idx: number }> = of();
  public touchCancel$: Observable<void> = of();
  public touchEnd$: Observable<{ event: TouchEvent; item: ElementRef<HTMLElement>; idx: number }> = of();

  private subs: Subscription = new Subscription();

  constructor(private deckFacade: DeckFacade, private boardFacade: BoardFacade, private scoreFacade: ScoreFacade) {}

  // eslint-disable-next-line max-lines-per-function
  public ngAfterViewInit(): void {
    const getTouchInfo = (event: { event: TouchEvent; item: ElementRef<HTMLElement>; idx: number }) => ({
      event: event.event,
      idx: event.idx,
      item: this.pieces.get(event.idx)!.nativeElement,
      position: getTargetTouch(event.event),
    });

    this.dragStart$ = merge(
      ...this.pieceWrappers.map((item: ElementRef<HTMLElement>, idx: number) => {
        return fromEvent<MouseEvent>(item.nativeElement, 'dragstart').pipe(map((event) => ({ event, item, idx })));
      }),
    );

    this.dragEnd$ = merge(
      ...this.pieceWrappers.map((item: ElementRef<HTMLElement>) => {
        return fromEvent<MouseEvent>(item.nativeElement, 'dragend').pipe(map(() => {}));
      }),
    );

    this.subs.add(
      this.dragStart$.subscribe((v) => {
        const coords = {
          x: v.event.x - (v.event.target as HTMLElement).offsetLeft,
          y: v.event.y - (v.event.target as HTMLElement).offsetTop,
        };

        this.deckFacade.setActivePiece(v.idx);
        this.deckFacade.setStartCoords(coords);
      }),
    );

    this.subs.add(
      this.dragEnd$.subscribe(() => {
        this.deckFacade.clearActivePiece();
        this.boardFacade.clearHover();
      }),
    );

    this.touchStart$ = merge(
      ...this.pieceWrappers.map((item: ElementRef<HTMLElement>, idx: number) => {
        return fromEvent<TouchEvent>(item.nativeElement, 'touchstart', { passive: false }).pipe(
          tap((event) => event.preventDefault()),
          map((event) => ({ event, item, idx })),
        );
      }),
    );

    this.touchMove$ = merge(
      ...this.pieceWrappers.map((item: ElementRef<HTMLElement>, idx: number) => {
        return fromEvent<TouchEvent>(item.nativeElement, 'touchmove', { passive: false }).pipe(
          tap((event) => event.preventDefault()),
          map((event) => ({ event, item, idx })),
        );
      }),
    );

    this.touchCancel$ = merge(
      ...this.pieceWrappers.map((item: ElementRef<HTMLElement>) => {
        return fromEvent<TouchEvent>(item.nativeElement, 'touchcancel').pipe(map(() => {}));
      }),
    );

    this.touchEnd$ = merge(
      ...this.pieceWrappers.map((item: ElementRef<HTMLElement>, idx: number) => {
        return fromEvent<TouchEvent>(item.nativeElement, 'touchend').pipe(map((event) => ({ event, item, idx })));
      }),
    );

    this.subs.add(
      this.touchStart$.pipe(map((v) => getTouchInfo(v))).subscribe((touchInfo) => {
        const coords = {
          x: touchInfo.position.targetX - touchInfo.item.offsetLeft,
          y: touchInfo.position.targetY - touchInfo.item.offsetTop,
        };
        this.deckFacade.setStartCoords(coords);
      }),
    );

    const baseInfo$ = this.boardFacade.corner$.pipe(
      switchMap((corner) => {
        return this.pieceList$.pipe(
          switchMap((pieceList) => {
            return this.boardFacade.board$.pipe(
              switchMap((board) => {
                return this.deckFacade.startCoords$.pipe(map((coords) => ({ coords, pieceList, board, corner })));
              }),
            );
          }),
        );
      }),
    );

    this.subs.add(
      baseInfo$
        .pipe(switchMap((baseInfo) => this.touchMove$.pipe(map((v) => ({ ...baseInfo, ...getTouchInfo(v) })))))
        .subscribe((touchInfo) => {
          touchInfo.item.style.position = 'absolute';
          touchInfo.item.style.left = `${touchInfo.position.targetX - touchInfo.coords.x}px`;
          touchInfo.item.style.top = `${touchInfo.position.targetY - touchInfo.coords.y - TOUCH_DISTANCE}px`;

          const { col, row } = getTouchCoords(touchInfo.event, touchInfo.coords, touchInfo.corner);
          if (!hasOverlap(touchInfo.board, touchInfo.pieceList[touchInfo.idx], row, col)) {
            this.boardFacade.hoverItem(touchInfo.pieceList[touchInfo.idx]!, row, col);
          } else {
            this.boardFacade.hoverItem([], 0, 0);
          }
        }),
    );

    this.subs.add(
      baseInfo$
        .pipe(switchMap((baseInfo) => this.touchEnd$.pipe(map((v) => ({ ...baseInfo, ...getTouchInfo(v) })))))
        .subscribe((touchInfo) => {
          touchInfo.item.style.position = 'absolute';
          touchInfo.item.style.left = `${touchInfo.position.targetX - touchInfo.coords.x}px`;
          touchInfo.item.style.top = `${touchInfo.position.targetY - touchInfo.coords.y - TOUCH_DISTANCE}px`;

          const { col, row } = getTouchCoords(touchInfo.event, touchInfo.coords, touchInfo.corner);
          if (!hasOverlap(touchInfo.board, touchInfo.pieceList[touchInfo.idx], row, col)) {
            this.boardFacade.placeItem(touchInfo.pieceList[touchInfo.idx]!, row, col);
            this.deckFacade.removePiece(touchInfo.idx);
            this.scoreFacade.addScore(pieceValue(touchInfo.pieceList[touchInfo.idx]));
          } else {
            this.releasePiece();
          }
        }),
    );

    this.subs.add(
      this.touchCancel$.subscribe(() => {
        this.releasePiece();
      }),
    );

    this.subs.add(
      this.deckFacade.outOfPieces$
        .pipe(
          delay(0),
          filter((isOut: boolean | undefined) => isOut === true || isOut === undefined),
        )
        .subscribe(() => this.newDeck()),
    );

    this.subs.add(this.deckFacade.gameOver$.pipe(debounceTime(0), filter(Boolean)).subscribe(() => this.newDeck()));
  }

  public newDeck() {
    this.deckFacade.setPieces([generatePiece(), generatePiece(), generatePiece()]);
    this.releasePiece();
  }

  public releasePiece() {
    this.pieces.forEach((target) => {
      target.nativeElement.style.position = 'unset';
    });

    this.deckFacade.clearActivePiece();
    this.boardFacade.hoverItem([], 0, 0);
    this.boardFacade.clearHover();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

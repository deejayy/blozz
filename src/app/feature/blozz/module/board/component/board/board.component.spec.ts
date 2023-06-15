import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlternatePipe } from '@feature/blozz/module/board/pipe/alternate.pipe';
import { BoardFacade } from '@feature/blozz/module/board/store/board.facade';
import { boardFeature } from '@feature/blozz/module/board/store/board.reducer';
import { DeckModule } from '@feature/blozz/module/deck/deck.module';
import { ScoreModule } from '@feature/blozz/module/score/score.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeckModule, EffectsModule.forRoot(), ScoreModule, StoreModule.forRoot(), StoreModule.forFeature(boardFeature)],
      declarations: [BoardComponent, AlternatePipe],
      providers: [BoardFacade],
    });
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

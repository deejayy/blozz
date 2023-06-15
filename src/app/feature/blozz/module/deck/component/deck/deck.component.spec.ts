import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardModule } from '@feature/blozz/module/board/board.module';
import { DeckFacade } from '@feature/blozz/module/deck/store/deck.facade';
import { deckFeature } from '@feature/blozz/module/deck/store/deck.reducer';
import { ScoreModule } from '@feature/blozz/module/score/score.module';
import { MatrixWidthPipe } from '@feature/blozz/pipe/matrix-width.pipe';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DeckComponent } from './deck.component';

describe('DeckComponent', () => {
  let component: DeckComponent;
  let fixture: ComponentFixture<DeckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckComponent, MatrixWidthPipe],
      imports: [BoardModule, EffectsModule.forRoot(), ScoreModule, StoreModule.forRoot(), StoreModule.forFeature(deckFeature)],
      providers: [DeckFacade],
    });
    fixture = TestBed.createComponent(DeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

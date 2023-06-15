import { ComponentFixture, TestBed } from '@angular/core/testing';
import { boardFeature } from '@feature/blozz/module/board/store/board.reducer';
import { DeckModule } from '@feature/blozz/module/deck/deck.module';
import { ScoreModule } from '@feature/blozz/module/score/score.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BoardModule } from '../../module/board/board.module';

import { BlozzComponent } from './blozz.component';

describe('BlozzComponent', () => {
  let component: BlozzComponent;
  let fixture: ComponentFixture<BlozzComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlozzComponent],
      imports: [
        BoardModule,
        DeckModule,
        EffectsModule.forRoot(),
        ScoreModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(boardFeature),
      ],
    });
    fixture = TestBed.createComponent(BlozzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

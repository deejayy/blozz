import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardModule } from '@feature/blozz/module/board/board.module';
import { DeckFacade } from '@feature/blozz/module/deck/store/deck.facade';
import { deckFeature } from '@feature/blozz/module/deck/store/deck.reducer';
import { ScoreModule } from '@feature/blozz/module/score/score.module';
import { MatrixWidthPipe } from '@feature/blozz/pipe/matrix-width.pipe';
import { StoreModule } from '@ngrx/store';
import { DeckComponent } from './component/deck/deck.component';

@NgModule({
  declarations: [DeckComponent, MatrixWidthPipe],
  imports: [BoardModule, CommonModule, ScoreModule, StoreModule.forFeature(deckFeature)],
  exports: [DeckComponent],
  providers: [DeckFacade],
})
export class DeckModule {}

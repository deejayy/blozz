import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BoardModule } from '@feature/blozz/module/board/board.module';
import { DeckFacade } from '@feature/blozz/module/deck/store/deck.facade';
import { deckFeature } from '@feature/blozz/module/deck/store/deck.reducer';
import { ScoreModule } from '@feature/blozz/module/score/score.module';
import { MatrixWidthPipe } from '@feature/blozz/pipe/matrix-width.pipe';
import { StoreModule } from '@ngrx/store';
import { DeckComponent } from './component/deck/deck.component';
import { NumberToArrayPipe } from './pipe/number-to-array.pipe';

@NgModule({
  declarations: [DeckComponent, MatrixWidthPipe, NumberToArrayPipe],
  imports: [BoardModule, CommonModule, MatButtonModule, MatIconModule, ScoreModule, StoreModule.forFeature(deckFeature)],
  exports: [DeckComponent],
  providers: [DeckFacade],
})
export class DeckModule {}

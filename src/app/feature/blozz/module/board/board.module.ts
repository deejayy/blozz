import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlternatePipe } from '@feature/blozz/module/board/pipe/alternate.pipe';
import { BoardFacade } from '@feature/blozz/module/board/store/board.facade';
import { boardFeature } from '@feature/blozz/module/board/store/board.reducer';
import { ScoreModule } from '@feature/blozz/module/score/score.module';
import { StoreModule } from '@ngrx/store';
import { BoardComponent } from './component/board/board.component';
import { PieceStatePipe } from './pipe/piece-state.pipe';

@NgModule({
  declarations: [AlternatePipe, BoardComponent, PieceStatePipe],
  imports: [CommonModule, ScoreModule, StoreModule.forFeature(boardFeature)],
  exports: [BoardComponent],
  providers: [BoardFacade],
})
export class BoardModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScoreFacade } from '@feature/blozz/module/score/store/score.facade';
import { scoreFeature } from '@feature/blozz/module/score/store/score.reducer';
import { ScoreEffects } from '@feature/blozz/module/score/store/store.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScoreAnnouncerComponent } from './component/score-announcer/score-announcer.component';
import { ScoreComponent } from './component/score/score.component';

@NgModule({
  declarations: [ScoreAnnouncerComponent, ScoreComponent],
  exports: [ScoreAnnouncerComponent, ScoreComponent],
  imports: [CommonModule, EffectsModule.forFeature(ScoreEffects), StoreModule.forFeature(scoreFeature)],
  providers: [ScoreFacade],
})
export class ScoreModule {}

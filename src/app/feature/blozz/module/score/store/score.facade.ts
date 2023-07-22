import { Injectable } from '@angular/core';
import { ScoreActions } from '@feature/blozz/module/score/store/score.action';
import { scoreFeature } from '@feature/blozz/module/score/store/score.reducer';
import { ScoreState } from '@feature/blozz/module/score/store/score.state';
import { GameMode, gameModes } from '@feature/blozz/module/settings/model/settings.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ScoreFacade {
  public score$: Observable<number> = this.store.select(scoreFeature.selectScore);
  public lastScore$: Observable<number> = this.store.select(scoreFeature.selectLastScore);
  public lastPoint$: Observable<number> = this.store.select(scoreFeature.selectLastPoint);
  public highScore$: Observable<number> = this.store.select(scoreFeature.selectHighScore);
  public multiplier$: Observable<number> = this.store.select(scoreFeature.selectMultiplier);

  constructor(private store: Store<ScoreState>) {}

  public addScore(score: number): void {
    this.store.dispatch(ScoreActions.addScore({ score }));
  }

  public resetScore(gameMode: GameMode = gameModes.STANDARD): void {
    this.store.dispatch(ScoreActions.resetScore({ gameMode }));
  }

  public setMultiplier(multiplier: number): void {
    this.store.dispatch(ScoreActions.setMultiplier({ multiplier }));
  }

  public addMultiplier(multiplier: number): void {
    this.store.dispatch(ScoreActions.addMultiplier({ multiplier }));
  }
}

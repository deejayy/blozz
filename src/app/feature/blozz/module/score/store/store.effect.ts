import { Injectable } from '@angular/core';
import { BOARD_WIDTH } from '@feature/blozz/module/board/component/board/board.component';
import { ScoreActions } from '@feature/blozz/module/score/store/score.action';
import { scoreFeature } from '@feature/blozz/module/score/store/score.reducer';
import { ScoreState } from '@feature/blozz/module/score/store/score.state';
import { settingsFeature } from '@feature/blozz/module/settings/store/settings.reducer';
import { SettingsState } from '@feature/blozz/module/settings/store/settings.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { delay, filter, map, withLatestFrom } from 'rxjs';

const MS_IN_SECOND = 1000;

@Injectable()
export class ScoreEffects {
  public lastPointReset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScoreActions.addScore),
      filter((action) => action.score > BOARD_WIDTH),
      withLatestFrom(this.settings.select(settingsFeature.selectGameMode)),
      delay(MS_IN_SECOND),
      map(([, gameMode]) => {
        return ScoreActions.resetLastPoint({ gameMode });
      }),
    ),
  );

  public persistHighScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScoreActions.resetScore),
      withLatestFrom(this.state.select(scoreFeature.selectHighScore), this.settings.select(settingsFeature.selectGameMode)),
      map(([, highScore, gameMode]) => {
        let newHighScore: number = highScore;

        try {
          const storedHighScore = parseInt(localStorage.getItem('highScore') ?? '0');
          newHighScore = Math.max(storedHighScore, highScore);
          localStorage.setItem('highScore', newHighScore.toString());
        } catch {
          console.error('Could not persist high score');
        }

        return ScoreActions.setHighScore({ highScore: newHighScore, gameMode });
      }),
    ),
  );

  constructor(private actions$: Actions, private state: Store<ScoreState>, private settings: Store<SettingsState>) {}
}

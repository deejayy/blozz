import { Injectable } from '@angular/core';
import { BOARD_WIDTH } from '@feature/blozz/module/board/component/board/board.component';
import { ScoreActions } from '@feature/blozz/module/score/store/score.action';
import { scoreFeature } from '@feature/blozz/module/score/store/score.reducer';
import { ScoreState } from '@feature/blozz/module/score/store/score.state';
import { GameMode } from '@feature/blozz/module/settings/model/settings.model';
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
      withLatestFrom(this.state.select(scoreFeature.selectScoreByMode)),
      map(([, highScore]) => {
        const newHighScores: Record<GameMode, { highScore: number }> = { ...highScore };

        try {
          localStorage.setItem('highScore', JSON.stringify(newHighScores));
        } catch {
          console.error('Cannot store high score');
        }

        return ScoreActions.setAllHighScore({ scoreByMode: newHighScores });
      }),
    ),
  );

  constructor(private actions$: Actions, private state: Store<ScoreState>, private settings: Store<SettingsState>) {}
}

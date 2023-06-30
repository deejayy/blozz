import { Injectable } from '@angular/core';
import { BOARD_WIDTH } from '@feature/blozz/module/board/component/board/board.component';
import { ScoreActions } from '@feature/blozz/module/score/store/score.action';
import { scoreFeature } from '@feature/blozz/module/score/store/score.reducer';
import { ScoreState } from '@feature/blozz/module/score/store/score.state';
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
      delay(MS_IN_SECOND),
      map(() => {
        return ScoreActions.resetLastPoint();
      }),
    ),
  );

  public persistHighScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ScoreActions.resetScore),
      withLatestFrom(this.state.select(scoreFeature.selectHighScore)),
      map(([, highScore]) => {
        let newHighScore: number = highScore;

        try {
          const storedHighScore = parseInt(localStorage.getItem('highScore') ?? '0');
          newHighScore = Math.max(storedHighScore, highScore);
          localStorage.setItem('highScore', newHighScore.toString());
        } catch {
          console.error('Could not persist high score');
        }

        return ScoreActions.setHighScore({ highScore: newHighScore });
      }),
    ),
  );

  constructor(private actions$: Actions, private state: Store<ScoreState>) {}
}

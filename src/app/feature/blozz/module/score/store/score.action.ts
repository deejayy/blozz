import { createAction, props } from '@ngrx/store';

export class ScoreActions {
  public static resetScore = createAction('[Score] Reset Score');
  public static setHighScore = createAction('[Score] Set Highscore', props<{ highScore: number }>());
  public static resetLastPoint = createAction('[Score] Reset Last Point');
  public static addScore = createAction('[Score] Add Score', props<{ score: number }>());
  public static setMultiplier = createAction('[Score] Set Multiplier', props<{ multiplier: number }>());
  public static addMultiplier = createAction('[Score] Add Multiplier', props<{ multiplier: number }>());
}

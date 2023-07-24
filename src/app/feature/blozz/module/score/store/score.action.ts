import { GameMode } from '@feature/blozz/module/settings/model/settings.model';
import { createAction, props } from '@ngrx/store';

export class ScoreActions {
  public static resetScore = createAction('[Score] Reset Score', props<{ gameMode: GameMode }>());
  public static setHighScore = createAction('[Score] Set Highscore', props<{ highScore: number; gameMode: GameMode }>());

  public static setAllHighScore = createAction(
    '[Score] Set All Highscore',
    props<{ scoreByMode: Record<GameMode, { highScore: number }> }>(),
  );

  public static resetLastPoint = createAction('[Score] Reset Last Point', props<{ gameMode: GameMode }>());
  public static addScore = createAction('[Score] Add Score', props<{ score: number }>());
  public static setMultiplier = createAction('[Score] Set Multiplier', props<{ multiplier: number }>());
  public static addMultiplier = createAction('[Score] Add Multiplier', props<{ multiplier: number }>());
}

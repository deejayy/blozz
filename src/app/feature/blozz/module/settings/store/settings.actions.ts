import { GameMode } from '@feature/blozz/module/settings/model/settings.model';
import { createAction, props } from '@ngrx/store';

export class SettingsActions {
  public static toggleAllowUndo = createAction('[Settings] Toggle Allow Undo');
  public static acknowledgeUpdate = createAction('[Settings] Acknowledge Update');
  public static setGameMode = createAction('[Settings] Set Game Mode', props<{ gameMode: GameMode }>());
}

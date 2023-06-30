import { createAction } from '@ngrx/store';

export class SettingsActions {
  public static toggleTetrisMode = createAction('[Settings] Toggle Tetris Mode');
  public static toggleAllowUndo = createAction('[Settings] Toggle Allow Undo');
  public static acknowledgeUpdate = createAction('[Settings] Acknowledge Update');
}

import { SettingsActions } from '@feature/blozz/module/settings/store/settings.actions';
import { initialSettingsState } from '@feature/blozz/module/settings/store/settings.state';
import { createFeature, createReducer } from '@ngrx/store';
import { produceOn } from '@shared/helper/produce-on';

const settingsReducer = createReducer(
  initialSettingsState,
  produceOn(SettingsActions.toggleTetrisMode, (state) => {
    state.tetrisMode = !state.tetrisMode;
  }),
  produceOn(SettingsActions.toggleAllowUndo, (state) => {
    state.allowUndo = !state.allowUndo;
  }),
);

export const settingsFeature = createFeature({
  name: 'settings',
  reducer: settingsReducer,
});

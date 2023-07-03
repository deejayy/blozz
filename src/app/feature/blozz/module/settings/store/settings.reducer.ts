import { gameModes } from '@feature/blozz/module/settings/model/settings.model';
import { SettingsActions } from '@feature/blozz/module/settings/store/settings.actions';
import { SettingsState, initialSettingsState } from '@feature/blozz/module/settings/store/settings.state';
import { ActionReducer, createFeature, createReducer, createSelector } from '@ngrx/store';
import { produceOn } from '@shared/helper/produce-on';

export const settingsReducer = createReducer(
  initialSettingsState,
  produceOn(SettingsActions.toggleTetrisMode, (state) => {
    state.gameMode = gameModes.TETRIS;
  }),
  produceOn(SettingsActions.toggleAllowUndo, (state) => {
    state.allowUndo = !state.allowUndo;
  }),
  produceOn(SettingsActions.acknowledgeUpdate, (state) => {
    state.ackUpdate = state.latestUpdate;
  }),
  produceOn(SettingsActions.setGameMode, (state, action) => {
    state.gameMode = action.gameMode;
  }),
);

export const settingsFeature = createFeature({
  name: 'settings',
  reducer: settingsReducer,
  extraSelectors: ({ selectLatestUpdate, selectAckUpdate, selectGameMode }) => ({
    selectNewFeatures: createSelector(
      selectLatestUpdate,
      selectAckUpdate,
      (latestUpdate, ackUpdate) => latestUpdate.toString() !== ackUpdate?.toString(),
    ),
    selectTetrisMode: createSelector(selectGameMode, (gameMode) => gameMode === gameModes.TETRIS),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const settingsMetaReducer = (reducer: ActionReducer<{ settings: SettingsState }>): ActionReducer<{ settings: SettingsState }> => {
  return (state, action) => {
    const newState = reducer(state, action);

    if (action.type === '@ngrx/store/init') {
      try {
        const ackDate: string | undefined = localStorage.getItem('ackDate') ?? undefined;

        newState.settings.ackUpdate = ackDate ? new Date(ackDate) : undefined;
      } catch (e) {
        console.error('Cannot acccess localStorage', e);
      }
    }

    return newState;
  };
};

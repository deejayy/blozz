import { BOARD_WIDTH } from '@feature/blozz/module/board/component/board/board.component';
import { ScoreActions } from '@feature/blozz/module/score/store/score.action';
import { ScoreState, initialScoreState } from '@feature/blozz/module/score/store/score.state';
import { GameMode, gameModes } from '@feature/blozz/module/settings/model/settings.model';
import { Action, createFeature, createReducer, createSelector } from '@ngrx/store';
import { produceOn } from '@shared/helper/produce-on';

export const scoreReducer = createReducer(
  initialScoreState,
  produceOn(ScoreActions.resetScore, (state, action) => {
    state.lastScore = state.score;
    state.highScore = Math.max(state.lastScore, state.scoreByMode[action.gameMode].highScore);
    state.score = 0;
    state.multiplier = 1;

    state.scoreByMode[action.gameMode].highScore = state.highScore;
  }),
  produceOn(ScoreActions.addScore, (state, action) => {
    if (action.score > BOARD_WIDTH) {
      state.lastPoint = action.score * state.multiplier;
    }
    state.score += action.score * state.multiplier;
    state.multiplier = Math.max(1, state.multiplier - 1);
  }),
  produceOn(ScoreActions.resetLastPoint, (state) => {
    state.lastPoint = 0;
  }),
  produceOn(ScoreActions.setHighScore, (state, action) => {
    state.highScore = action.highScore;
    state.scoreByMode[action.gameMode].highScore = action.highScore;
  }),
  produceOn(ScoreActions.setAllHighScore, (state, action) => {
    state.scoreByMode = { ...state.scoreByMode, ...action.scoreByMode };
  }),
  produceOn(ScoreActions.setMultiplier, (state, action) => {
    state.multiplier = action.multiplier;
  }),
  produceOn(ScoreActions.addMultiplier, (state, action) => {
    state.multiplier += action.multiplier;
  }),
);

export const scoreFeature = createFeature({
  name: 'score',
  reducer: scoreReducer,
  extraSelectors: ({ selectScoreByMode }) => ({
    selectHighScore: createSelector(selectScoreByMode, (scoreByMode) => scoreByMode.standard.highScore),
    selectHighScoreByMode: (gameMode: GameMode) => createSelector(selectScoreByMode, (scoreByMode) => scoreByMode[gameMode].highScore),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const scoreMetaReducer = (reducer: any): any => {
  return (state: ScoreState, action: Action) => {
    const newState = reducer(state, action);
    let storedScoreInfo: string | null;

    if (action.type === '@ngrx/store/init') {
      try {
        storedScoreInfo = localStorage.getItem('highScore') ?? '0';
      } catch {
        storedScoreInfo = '{}';
        console.error('Cannot load high score');
      }

      try {
        if (parseInt(storedScoreInfo)) {
          newState.score.scoreByMode[gameModes.STANDARD].highScore = parseInt(storedScoreInfo);
        } else {
          const storeScoreStruct = JSON.parse(storedScoreInfo);
          newState.score.scoreByMode = { ...newState.score.scoreByMode, ...storeScoreStruct };
        }
      } catch (e) {
        console.error('Invalid score structure', e);
      }
    }

    return newState;
  };
};

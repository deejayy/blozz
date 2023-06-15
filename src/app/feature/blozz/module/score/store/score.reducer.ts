import { BOARD_WIDTH } from '@feature/blozz/module/board/component/board/board.component';
import { ScoreActions } from '@feature/blozz/module/score/store/score.action';
import { initialScoreState } from '@feature/blozz/module/score/store/score.state';
import { createFeature, createReducer } from '@ngrx/store';
import { produceOn } from '@shared/helper/produce-on';

const scoreReducer = createReducer(
  initialScoreState,
  produceOn(ScoreActions.resetScore, (state) => {
    state.lastScore = state.score;
    state.highScore = Math.max(state.lastScore, state.highScore);
    state.score = 0;
    state.multiplier = 1;
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
});

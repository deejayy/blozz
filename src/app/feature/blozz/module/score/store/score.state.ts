export interface ScoreState {
  score: number;
  lastScore: number;
  highScore: number;
  lastPoint: number;
  multiplier: number;
}

export const initialScoreState: ScoreState = {
  score: 0,
  lastScore: 0,
  highScore: 0,
  lastPoint: 0,
  multiplier: 1,
};

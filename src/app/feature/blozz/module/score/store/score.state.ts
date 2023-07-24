import { GameMode } from '@feature/blozz/module/settings/model/settings.model';

export interface ScoreState {
  score: number;
  lastScore: number;
  highScore: number;
  lastPoint: number;
  multiplier: number;
  scoreByMode: Record<GameMode, { highScore: number }>;
}

export const initialScoreState: ScoreState = {
  score: 0,
  lastScore: 0,
  highScore: 0,
  lastPoint: 0,
  multiplier: 1,
  scoreByMode: {
    extreme: { highScore: 0 },
    standard: { highScore: 0 },
    tetris: { highScore: 0 },
  },
};

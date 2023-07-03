import { GameMode, gameModes } from '@feature/blozz/module/settings/model/settings.model';

export interface SettingsState {
  gameMode: GameMode;
  allowUndo: boolean;
  latestUpdate: Date;
  ackUpdate: Date | undefined;
}

export const initialSettingsState: SettingsState = {
  gameMode: gameModes.STANDARD,
  allowUndo: false,
  latestUpdate: new Date('2023-07-03 21:25:00'),
  ackUpdate: undefined,
};

import { GameMode, gameModes } from '@feature/blozz/module/settings/model/settings.model';

export interface SettingsState {
  gameMode: GameMode;
  allowUndo: boolean;
  zenMode: boolean;
  latestUpdate: Date;
  ackUpdate: Date | undefined;
}

export const initialSettingsState: SettingsState = {
  gameMode: gameModes.STANDARD,
  allowUndo: false,
  zenMode: false,
  latestUpdate: new Date('2023-07-26 00:18:00'),
  ackUpdate: undefined,
};

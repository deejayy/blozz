export interface SettingsState {
  tetrisMode: boolean;
  allowUndo: boolean;
  latestUpdate: Date;
  ackUpdate: Date | undefined;
}

export const initialSettingsState: SettingsState = {
  tetrisMode: true,
  allowUndo: false,
  latestUpdate: new Date('2023-06-30 22:20:00'),
  ackUpdate: undefined,
};

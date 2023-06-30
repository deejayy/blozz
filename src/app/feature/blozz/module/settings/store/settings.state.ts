export interface SettingsState {
  tetrisMode: boolean;
  allowUndo: boolean;
}

export const initialSettingsState: SettingsState = {
  tetrisMode: true,
  allowUndo: false,
};

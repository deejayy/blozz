import { Injectable } from '@angular/core';
import { GameMode } from '@feature/blozz/module/settings/model/settings.model';
import { SettingsActions } from '@feature/blozz/module/settings/store/settings.actions';
import { settingsFeature } from '@feature/blozz/module/settings/store/settings.reducer';
import { SettingsState } from '@feature/blozz/module/settings/store/settings.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsFacade {
  public tetrisMode$: Observable<boolean> = this.store.select(settingsFeature.selectTetrisMode);
  public allowUndo$: Observable<boolean> = this.store.select(settingsFeature.selectAllowUndo);
  public newFeatures$: Observable<boolean> = this.store.select(settingsFeature.selectNewFeatures);
  public latestUpdate$: Observable<Date> = this.store.select(settingsFeature.selectLatestUpdate);
  public gameMode$: Observable<GameMode> = this.store.select(settingsFeature.selectGameMode);
  public zenMode$: Observable<boolean> = this.store.select(settingsFeature.selectZenMode);

  constructor(private store: Store<SettingsState>) {}

  public toggleAllowUndo() {
    this.store.dispatch(SettingsActions.toggleAllowUndo());
  }

  public toggleZenMode() {
    this.store.dispatch(SettingsActions.toggleZenMode());
  }

  public acknowledgeUpdate() {
    this.store.dispatch(SettingsActions.acknowledgeUpdate());
  }

  public setGameMode(gameMode: GameMode) {
    this.store.dispatch(SettingsActions.setGameMode({ gameMode }));
  }
}

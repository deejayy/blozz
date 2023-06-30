import { Injectable } from '@angular/core';
import { SettingsActions } from '@feature/blozz/module/settings/store/settings.actions';
import { settingsFeature } from '@feature/blozz/module/settings/store/settings.reducer';
import { SettingsState } from '@feature/blozz/module/settings/store/settings.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class SettingsFacade {
  public tetrisMode$: Observable<boolean> = this.store.select(settingsFeature.selectTetrisMode);
  public allowUndo$: Observable<boolean> = this.store.select(settingsFeature.selectAllowUndo);

  constructor(private store: Store<SettingsState>) {}

  public toggleTetrisMode() {
    this.store.dispatch(SettingsActions.toggleTetrisMode());
  }

  public toggleAllowUndo() {
    this.store.dispatch(SettingsActions.toggleAllowUndo());
  }
}

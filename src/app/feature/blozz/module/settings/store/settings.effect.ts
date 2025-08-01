import { Injectable } from '@angular/core';
import { SettingsActions } from '@feature/blozz/module/settings/store/settings.actions';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, switchMap, tap } from 'rxjs';

@Injectable()
export class SettingsEffects {
  public ackUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SettingsActions.acknowledgeUpdate),
        switchMap(() => {
          return this.settingsFacade.latestUpdate$;
        }),
        tap((latestUpdate) => {
          localStorage.setItem('ackDate', latestUpdate.toString());
        }),
      ),
    { dispatch: false },
  );

  // save full state into localStorage on any change of the state
  public saveState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SettingsActions.toggleZenMode, SettingsActions.setGameMode),
        switchMap(() => {
          return combineLatest([this.settingsFacade.zenMode$, this.settingsFacade.gameMode$]);
        }),
        tap(([zenMode, gameMode]) => {
          localStorage.setItem('settings', JSON.stringify({ zenMode, gameMode }));
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private settingsFacade: SettingsFacade) {}
}

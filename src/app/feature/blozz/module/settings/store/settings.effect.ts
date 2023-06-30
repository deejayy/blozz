import { Injectable } from '@angular/core';
import { SettingsActions } from '@feature/blozz/module/settings/store/settings.actions';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs';

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

  constructor(private actions$: Actions, private settingsFacade: SettingsFacade) {}
}

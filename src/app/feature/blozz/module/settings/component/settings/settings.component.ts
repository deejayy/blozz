import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  public tetrisMode$: Observable<boolean> = this.settingsFacade.tetrisMode$;
  public allowUndo$: Observable<boolean> = this.settingsFacade.allowUndo$;

  constructor(private settingsFacade: SettingsFacade) {
    this.settingsFacade.acknowledgeUpdate();
  }

  public toggleTetrisMode() {
    this.settingsFacade.toggleTetrisMode();
  }

  public toggleAllowUndo() {
    this.settingsFacade.toggleAllowUndo();
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blozz',
  templateUrl: './blozz.component.html',
  styleUrls: ['./blozz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlozzComponent {
  public newFeatures$: Observable<boolean> = this.settingsFacade.newFeatures$;

  constructor(private settingsFacade: SettingsFacade) {}
}

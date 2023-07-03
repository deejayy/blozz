import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { GameMode } from '@feature/blozz/module/settings/model/settings.model';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';
import { Observable } from 'rxjs';

interface GameModeItem {
  title: string;
  id: GameMode,
  disabled?: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  public tetrisMode$: Observable<boolean> = this.settingsFacade.tetrisMode$;
  public allowUndo$: Observable<boolean> = this.settingsFacade.allowUndo$;
  public gameMode$: Observable<GameMode> = this.settingsFacade.gameMode$;

  public gameModeList: GameModeItem[] = [
    {
      title: 'Classic',
      id: 'standard',
    },
    {
      title: 'Tetris mode',
      id: 'tetris',
    },
    {
      title: 'Extreme blocks',
      id: 'extreme',
    },
  ];

  constructor(private settingsFacade: SettingsFacade) {
    this.settingsFacade.acknowledgeUpdate();
  }

  public toggleAllowUndo() {
    this.settingsFacade.toggleAllowUndo();
  }

  public setGameMode(event: MatRadioChange) {
    this.settingsFacade.setGameMode(event.value as GameMode);
  }
}

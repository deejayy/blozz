import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScoreFacade } from '@feature/blozz/module/score/store/score.facade';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
  public score$: Observable<number> = this.scoreFacade.score$;
  public lastScore$: Observable<number> = this.scoreFacade.lastScore$;
  public highScore$: Observable<number> = this.settingFacade.gameMode$.pipe(
    switchMap((gameMode) => this.scoreFacade.highScores$.pipe(map((scores) => scores[gameMode].highScore))),
  );

  constructor(private scoreFacade: ScoreFacade, private settingFacade: SettingsFacade) {}
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScoreFacade } from '@feature/blozz/module/score/store/score.facade';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-score-announcer',
  templateUrl: './score-announcer.component.html',
  styleUrls: ['./score-announcer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreAnnouncerComponent {
  public lastPoints$: Observable<number> = this.scoreFacade.lastPoint$;
  public comboDisplay$: Observable<number> = this.scoreFacade.multiplier$;
  public flash$: Observable<boolean> = this.scoreFacade.lastPoint$.pipe(map((point: number) => point > 0));

  constructor(private scoreFacade: ScoreFacade) {}
}

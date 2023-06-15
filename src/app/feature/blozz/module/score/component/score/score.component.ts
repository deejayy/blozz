import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScoreFacade } from '@feature/blozz/module/score/store/score.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
  public score$: Observable<number> = this.scoreFacade.score$;
  public lastScore$: Observable<number> = this.scoreFacade.lastScore$;
  public highScore$: Observable<number> = this.scoreFacade.highScore$;

  constructor(private scoreFacade: ScoreFacade) {}
}

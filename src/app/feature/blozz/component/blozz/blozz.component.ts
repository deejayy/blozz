import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-blozz',
  templateUrl: './blozz.component.html',
  styleUrls: ['./blozz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlozzComponent {}

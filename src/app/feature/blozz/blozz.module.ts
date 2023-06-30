import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BlozzRoutingModule } from '@feature/blozz/blozz-routing.module';
import { BoardModule } from '@feature/blozz/module/board/board.module';
import { DeckModule } from '@feature/blozz/module/deck/deck.module';
import { ScoreModule } from '@feature/blozz/module/score/score.module';
import { SettingsModule } from '@feature/blozz/module/settings/settings.module';
import { BlozzComponent } from './component/blozz/blozz.component';

@NgModule({
  declarations: [BlozzComponent],
  imports: [
    BlozzRoutingModule,
    BoardModule,
    CommonModule,
    DeckModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    ScoreModule,
    SettingsModule,
  ],
})
export class BlozzModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { SettingsEffects } from '@feature/blozz/module/settings/store/settings.effect';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';
import { settingsFeature } from '@feature/blozz/module/settings/store/settings.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SettingsComponent } from './component/settings/settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature(SettingsEffects),
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule,
    StoreModule.forFeature(settingsFeature),
  ],
  providers: [SettingsFacade],
})
export class SettingsModule {}

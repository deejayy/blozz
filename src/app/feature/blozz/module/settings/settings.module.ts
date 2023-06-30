import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { settingsFeature } from '@feature/blozz/module/settings/store/settings.reducer';
import { StoreModule } from '@ngrx/store';
import { SettingsComponent } from './component/settings/settings.component';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSlideToggleModule, RouterModule, StoreModule.forFeature(settingsFeature)],
  providers: [SettingsFacade],
})
export class SettingsModule {}

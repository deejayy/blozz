// eslint-disable-next-line max-classes-per-file
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveConfigModule } from '@deejayy/reactive-config';
import { RuntimeLocalizerModule } from '@deejayy/runtime-localizer';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FrameModule } from '@shared/frame/frame.module';

import { settingsMetaReducer, settingsReducer } from '@feature/blozz/module/settings/store/settings.reducer';
import { SettingsState } from '@feature/blozz/module/settings/store/settings.state';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreState } from '@feature/blozz/module/score/store/score.state';
import { scoreMetaReducer, scoreReducer } from '@feature/blozz/module/score/store/score.reducer';

export class ConfigVars {
  public apiUrl!: string;
}

export const reducers: ActionReducerMap<{ settings: SettingsState, score: ScoreState }> = {
  settings: settingsReducer,
  score: scoreReducer,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FrameModule,
    StoreModule.forRoot(reducers, { metaReducers: [scoreMetaReducer, settingsMetaReducer] }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Blozz',
      maxAge: 200,
      logOnly: environment.production,
    }),
    ReactiveConfigModule.forRoot(ConfigVars, { configPath: environment.config }),
    RuntimeLocalizerModule.forRoot([
      {
        lang: 'en-US',
        path: '/assets/messages/messages.en-US.json',
      },
      {
        lang: 'hu-HU',
        path: '/assets/messages/messages.hu-HU.json',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

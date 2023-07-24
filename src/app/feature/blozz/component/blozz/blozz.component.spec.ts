import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { boardFeature } from '@feature/blozz/module/board/store/board.reducer';
import { DeckModule } from '@feature/blozz/module/deck/deck.module';
import { ScoreModule } from '@feature/blozz/module/score/score.module';
import { SettingsModule } from '@feature/blozz/module/settings/settings.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardModule } from '../../module/board/board.module';
import { BlozzComponent } from './blozz.component';
import { SettingsFacade } from '@feature/blozz/module/settings/store/settings.facade';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';

describe('BlozzComponent', () => {
  let component: BlozzComponent;
  let fixture: ComponentFixture<BlozzComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlozzComponent],
      imports: [
        BoardModule,
        DeckModule,
        EffectsModule.forRoot(),
        ScoreModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(boardFeature),
        SettingsModule,
        RouterTestingModule,
        MatIconModule,
        MatButtonModule,
        MatRadioModule,
        MatBadgeModule,
        MatSlideToggleModule,
      ],
      providers: [SettingsFacade],
    });
    fixture = TestBed.createComponent(BlozzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

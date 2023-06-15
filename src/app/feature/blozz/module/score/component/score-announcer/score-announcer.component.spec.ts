import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreFacade } from '@feature/blozz/module/score/store/score.facade';
import { scoreFeature } from '@feature/blozz/module/score/store/score.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ScoreAnnouncerComponent } from './score-announcer.component';

describe('ScoreAnnouncerComponent', () => {
  let component: ScoreAnnouncerComponent;
  let fixture: ComponentFixture<ScoreAnnouncerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreAnnouncerComponent],
      imports: [EffectsModule.forRoot(), StoreModule.forRoot(), StoreModule.forFeature(scoreFeature)],
      providers: [ScoreFacade],
    });
    fixture = TestBed.createComponent(ScoreAnnouncerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

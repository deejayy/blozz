import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreFacade } from '@feature/blozz/module/score/store/score.facade';
import { scoreFeature } from '@feature/blozz/module/score/store/score.reducer';
import { StoreModule } from '@ngrx/store';

import { ScoreComponent } from './score.component';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(), StoreModule.forFeature(scoreFeature)],
      declarations: [ScoreComponent],
      providers: [ScoreFacade],
    });
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

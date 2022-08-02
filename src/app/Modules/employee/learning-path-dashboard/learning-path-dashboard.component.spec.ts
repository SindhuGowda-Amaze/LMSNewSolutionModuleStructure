import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPathDashboardComponent } from './learning-path-dashboard.component';

describe('LearningPathDashboardComponent', () => {
  let component: LearningPathDashboardComponent;
  let fixture: ComponentFixture<LearningPathDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningPathDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPathDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

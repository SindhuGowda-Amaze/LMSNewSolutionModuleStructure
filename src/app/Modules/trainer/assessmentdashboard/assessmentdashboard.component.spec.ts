import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentdashboardComponent } from './assessmentdashboard.component';

describe('AssessmentdashboardComponent', () => {
  let component: AssessmentdashboardComponent;
  let fixture: ComponentFixture<AssessmentdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

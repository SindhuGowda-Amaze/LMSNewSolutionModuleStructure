import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCourseDashboardComponent } from './assign-course-dashboard.component';

describe('AssignCourseDashboardComponent', () => {
  let component: AssignCourseDashboardComponent;
  let fixture: ComponentFixture<AssignCourseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCourseDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCourseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

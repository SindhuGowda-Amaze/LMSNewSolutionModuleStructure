import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCourseToEmployeeComponent } from './assign-course-to-employee.component';

describe('AssignCourseToEmployeeComponent', () => {
  let component: AssignCourseToEmployeeComponent;
  let fixture: ComponentFixture<AssignCourseToEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCourseToEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCourseToEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

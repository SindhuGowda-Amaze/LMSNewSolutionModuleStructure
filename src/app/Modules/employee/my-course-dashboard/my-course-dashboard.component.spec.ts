import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseDashboardComponent } from './my-course-dashboard.component';

describe('MyCourseDashboardComponent', () => {
  let component: MyCourseDashboardComponent;
  let fixture: ComponentFixture<MyCourseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCourseDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCourseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

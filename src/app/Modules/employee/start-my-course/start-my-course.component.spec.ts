import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMyCourseComponent } from './start-my-course.component';

describe('StartMyCourseComponent', () => {
  let component: StartMyCourseComponent;
  let fixture: ComponentFixture<StartMyCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartMyCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartMyCourseNewComponent } from './start-my-course-new.component';

describe('StartMyCourseNewComponent', () => {
  let component: StartMyCourseNewComponent;
  let fixture: ComponentFixture<StartMyCourseNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartMyCourseNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartMyCourseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceNewComponent } from './attendance-new.component';

describe('AttendanceNewComponent', () => {
  let component: AttendanceNewComponent;
  let fixture: ComponentFixture<AttendanceNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

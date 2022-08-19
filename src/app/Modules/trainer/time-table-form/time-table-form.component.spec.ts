import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableFormComponent } from './time-table-form.component';

describe('TimeTableFormComponent', () => {
  let component: TimeTableFormComponent;
  let fixture: ComponentFixture<TimeTableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

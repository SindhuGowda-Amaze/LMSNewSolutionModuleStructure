import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledTrainingComponent } from './enrolled-training.component';

describe('EnrolledTrainingComponent', () => {
  let component: EnrolledTrainingComponent;
  let fixture: ComponentFixture<EnrolledTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

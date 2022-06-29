import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCouresMappingFormComponent } from './trainer-coures-mapping-form.component';

describe('TrainerCouresMappingFormComponent', () => {
  let component: TrainerCouresMappingFormComponent;
  let fixture: ComponentFixture<TrainerCouresMappingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerCouresMappingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerCouresMappingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

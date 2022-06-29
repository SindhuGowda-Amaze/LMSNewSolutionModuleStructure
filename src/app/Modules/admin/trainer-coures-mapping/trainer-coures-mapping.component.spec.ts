import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCouresMappingComponent } from './trainer-coures-mapping.component';

describe('TrainerCouresMappingComponent', () => {
  let component: TrainerCouresMappingComponent;
  let fixture: ComponentFixture<TrainerCouresMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerCouresMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerCouresMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

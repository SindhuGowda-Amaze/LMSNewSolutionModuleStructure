import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitedtestsComponent } from './submitedtests.component';

describe('SubmitedtestsComponent', () => {
  let component: SubmitedtestsComponent;
  let fixture: ComponentFixture<SubmitedtestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitedtestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitedtestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

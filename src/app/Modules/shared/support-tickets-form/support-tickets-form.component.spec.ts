import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketsFormComponent } from './support-tickets-form.component';

describe('SupportTicketsFormComponent', () => {
  let component: SupportTicketsFormComponent;
  let fixture: ComponentFixture<SupportTicketsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportTicketsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTicketsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketsDashComponent } from './support-tickets-dash.component';

describe('SupportTicketsDashComponent', () => {
  let component: SupportTicketsDashComponent;
  let fixture: ComponentFixture<SupportTicketsDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportTicketsDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTicketsDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

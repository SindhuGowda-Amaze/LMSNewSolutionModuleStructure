import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangerDashboardComponent } from './manger-dashboard.component';

describe('MangerDashboardComponent', () => {
  let component: MangerDashboardComponent;
  let fixture: ComponentFixture<MangerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangerDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDashboardComponent } from './certificate-dashboard.component';

describe('CertificateDashboardComponent', () => {
  let component: CertificateDashboardComponent;
  let fixture: ComponentFixture<CertificateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

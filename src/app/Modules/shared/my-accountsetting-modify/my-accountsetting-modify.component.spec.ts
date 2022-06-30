import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountsettingModifyComponent } from './my-accountsetting-modify.component';

describe('MyAccountsettingModifyComponent', () => {
  let component: MyAccountsettingModifyComponent;
  let fixture: ComponentFixture<MyAccountsettingModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountsettingModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountsettingModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

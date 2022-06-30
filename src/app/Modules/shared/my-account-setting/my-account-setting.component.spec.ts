import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountSettingComponent } from './my-account-setting.component';

describe('MyAccountSettingComponent', () => {
  let component: MyAccountSettingComponent;
  let fixture: ComponentFixture<MyAccountSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAccountSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountSettingComponent } from './my-account-setting/my-account-setting.component';
import { MyAccountsettingModifyComponent } from './my-accountsetting-modify/my-accountsetting-modify.component';
import { SharedComponent } from './shared.component';

const routes: Routes = [{ path: '', component: SharedComponent },
{path:'MyAccountsettingModify',component:MyAccountsettingModifyComponent},
{path:'MyAccountSetting',component:MyAccountSettingComponent}




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }

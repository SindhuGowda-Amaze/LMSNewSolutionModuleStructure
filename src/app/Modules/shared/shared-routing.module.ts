import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { MyAccountSettingComponent } from './my-account-setting/my-account-setting.component';
import { MyAccountsettingModifyComponent } from './my-accountsetting-modify/my-accountsetting-modify.component';
import { SharedComponent } from './shared.component';
import { SupportTicketsDashComponent } from './support-tickets-dash/support-tickets-dash.component';
import { SupportTicketsFormComponent } from './support-tickets-form/support-tickets-form.component';

const routes: Routes = [
  
{ path: '', component: SharedComponent },
{path:'MyAccountsettingModify',component:MyAccountsettingModifyComponent},
{path:'MyAccountSetting',component:MyAccountSettingComponent},
{path:'Help',component:HelpComponent},
{path:'SupportTicketsDashboard',component:SupportTicketsDashComponent},
{path:'SupportTicketsForm',component:SupportTicketsFormComponent},
{path:'SupportTicketsForm/:id',component:SupportTicketsFormComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }


import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HelpComponent } from './help/help.component';
import { LoaderComponent } from './loader/loader.component';
import { SupportTicketsDashComponent } from './support-tickets-dash/support-tickets-dash.component';
import { SupportTicketsFormComponent } from './support-tickets-form/support-tickets-form.component';



import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MyAccountSettingComponent } from './my-account-setting/my-account-setting.component';
import { MyAccountsettingModifyComponent } from './my-accountsetting-modify/my-accountsetting-modify.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';




const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles
};



@NgModule({
  declarations: [
    SharedComponent,
    HelpComponent,
    LoaderComponent,
    SupportTicketsDashComponent,
    SupportTicketsFormComponent,
    MyAccountSettingComponent,
    MyAccountsettingModifyComponent,
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgxDropzoneModule,
    NgxDocViewerModule,


  ],
  exports: [
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgWizardModule,
    NgxDropzoneModule,
    NgxDocViewerModule,

  ]
})
export class SharedModule { }

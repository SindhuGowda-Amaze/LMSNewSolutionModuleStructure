import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HelpComponent } from './help/help.component';
import { LoaderComponent } from './loader/loader.component';
import { SupportTicketsDashComponent } from './support-tickets-dash/support-tickets-dash.component';
import { SupportTicketsFormComponent } from './support-tickets-form/support-tickets-form.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { NgxDropzoneModule } from 'ngx-dropzone';



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
    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
<<<<<<< HEAD
    Ng2SearchPipeModule
=======
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgWizardModule.forRoot(ngWizardConfig),
    NgxDropzoneModule,


>>>>>>> d5bafc0b35b85834bfea9315fef21117c149cefb
  ],
  exports: [
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgWizardModule,
    NgxDropzoneModule,

  ]
})
export class SharedModule { }

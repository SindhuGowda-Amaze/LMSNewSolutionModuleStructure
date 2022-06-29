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


@NgModule({
  declarations: [
    SharedComponent,
    HelpComponent,
    LoaderComponent,
    SupportTicketsDashComponent,
    SupportTicketsFormComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  exports: [
    FormsModule,
    Ng2SearchPipeModule,
  ]
})
export class SharedModule { }

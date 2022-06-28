import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HelpComponent } from './help/help.component';
import { LoaderComponent } from './loader/loader.component';
import { SupportTicketsDashComponent } from './support-tickets-dash/support-tickets-dash.component';
import { SupportTicketsFormComponent } from './support-tickets-form/support-tickets-form.component';


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
    SharedRoutingModule
  ]
})
export class SharedModule { }

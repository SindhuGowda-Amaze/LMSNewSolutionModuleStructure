import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HRRoutingModule } from './hr-routing.module';
import { HRComponent } from './hr.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HRComponent
  ],
  imports: [
    CommonModule,
    HRRoutingModule,
    SharedModule
  ]
})
export class HRModule { }

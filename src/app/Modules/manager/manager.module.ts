import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { EmployeeAssessmentReportComponent } from './employee-assessment-report/employee-assessment-report.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ManagerComponent,
    EmployeeReportComponent,
    EmployeeAssessmentReportComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule
  ]
})
export class ManagerModule { }

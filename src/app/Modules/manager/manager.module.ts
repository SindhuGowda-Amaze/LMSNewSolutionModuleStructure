import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { EmployeeAssessmentReportComponent } from './employee-assessment-report/employee-assessment-report.component';
import { SharedModule } from '../shared/shared.module';
import { FinalResultComponent } from './final-result/final-result.component';
import { AssignCourseDashboardComponent } from './assign-course-dashboard/assign-course-dashboard.component';
import { AssignCourseToEmployeeComponent } from './assign-course-to-employee/assign-course-to-employee.component';
import { CertificateDashboardComponent } from './certificate-dashboard/certificate-dashboard.component';
import { MangerDashboardComponent } from './manger-dashboard/manger-dashboard.component';
import { TraineeReportComponent } from './trainee-report/trainee-report.component';
import { PIPReportComponent } from './pipreport/pipreport.component';


@NgModule({
  declarations: [
    ManagerComponent,
    EmployeeReportComponent,
    EmployeeAssessmentReportComponent,
    FinalResultComponent,
    AssignCourseDashboardComponent,
    AssignCourseToEmployeeComponent,
    CertificateDashboardComponent,
    MangerDashboardComponent,
    TraineeReportComponent,
    PIPReportComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule
  ]
})
export class ManagerModule { }

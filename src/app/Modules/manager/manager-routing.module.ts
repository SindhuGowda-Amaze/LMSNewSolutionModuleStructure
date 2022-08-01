import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignCourseDashboardComponent } from './assign-course-dashboard/assign-course-dashboard.component';
import { AssignCourseToEmployeeComponent } from './assign-course-to-employee/assign-course-to-employee.component';
import { CertificateDashboardComponent } from './certificate-dashboard/certificate-dashboard.component';
import { EmployeeAssessmentReportComponent } from './employee-assessment-report/employee-assessment-report.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { FinalResultComponent } from './final-result/final-result.component';
import { ManagerComponent } from './manager.component';
import { MangerDashboardComponent } from './manger-dashboard/manger-dashboard.component';

const routes: Routes = [{ path: '', component: ManagerComponent },
{path:'EmployeeAssessmentReport',component:EmployeeAssessmentReportComponent},
{path:'EmployeeReport',component:EmployeeReportComponent},
{path:'AssignCourseDashboard',component:AssignCourseDashboardComponent},
{path:'AssignCourseToEmployee',component:AssignCourseToEmployeeComponent},
{path:'AssignCourseToEmployee/:id',component:AssignCourseToEmployeeComponent},


{path:'CertificateDashboard',component:CertificateDashboardComponent},
{path:'FinalResult',component:FinalResultComponent},
{path:'MangerDashboard',component:MangerDashboardComponent}







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }

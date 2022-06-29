import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAssessmentReportComponent } from './employee-assessment-report/employee-assessment-report.component';
import { EmployeeReportComponent } from './employee-report/employee-report.component';
import { ManagerComponent } from './manager.component';

const routes: Routes = [{ path: '', component: ManagerComponent },
{path:'EmployeeAssessmentReport',component:EmployeeAssessmentReportComponent},
{path:'EmployeeReport',component:EmployeeReportComponent}







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }

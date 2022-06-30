import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentResultComponent } from './assessment-result/assessment-result.component';
import { AssessmentdashboardComponent } from './assessmentdashboard/assessmentdashboard.component';
import { CheckanswerComponent } from './checkanswer/checkanswer.component';
import { EmployeeAssessmentResultComponent } from './employee-assessment-result/employee-assessment-result.component';
import { TrainerComponent } from './trainer.component';

const routes: Routes = [{ path: '', component: TrainerComponent },
{path:'AssessmentForm',component:AssessmentFormComponent},
{path:'AssessmentResult',component:AssessmentResultComponent},
{path:'Assessmentdashboard',component:AssessmentdashboardComponent},
{path:'MyAccountSetting',component:CheckanswerComponent},
{path:'EmployeeAssessmentResult',component:EmployeeAssessmentResultComponent}





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerComponent } from './trainer.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentResultComponent } from './assessment-result/assessment-result.component';
import { AssessmentdashboardComponent } from './assessmentdashboard/assessmentdashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CheckanswerComponent } from './checkanswer/checkanswer.component';
import { EmployeeAssessmentResultComponent } from './employee-assessment-result/employee-assessment-result.component';


@NgModule({
  declarations: [
    TrainerComponent,
    AssessmentFormComponent,
    AssessmentResultComponent,
    AssessmentdashboardComponent,
    CheckanswerComponent,
    EmployeeAssessmentResultComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    SharedModule,
    
  ]
})
export class TrainerModule { }

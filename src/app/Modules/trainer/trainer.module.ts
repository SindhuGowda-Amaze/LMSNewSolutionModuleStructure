import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerRoutingModule } from './trainer-routing.module';
import { TrainerComponent } from './trainer.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { AssessmentResultComponent } from './assessment-result/assessment-result.component';
import { AssessmentdashboardComponent } from './assessmentdashboard/assessmentdashboard.component';


@NgModule({
  declarations: [
    TrainerComponent,
    AssessmentFormComponent,
    AssessmentResultComponent,
    AssessmentdashboardComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule
  ]
})
export class TrainerModule { }

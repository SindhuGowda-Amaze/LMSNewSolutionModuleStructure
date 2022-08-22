import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { AttendanceNewComponent } from './attendance-new/attendance-new.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { SharedModule } from '../shared/shared.module';
import { ViewCourseComponent } from './view-course/view-course.component';
import { TakeAssessmentComponent } from './take-assessment/take-assessment.component';
import { StartMyCourseNewComponent } from './start-my-course-new/start-my-course-new.component';
import { StartMyCourseComponent } from './start-my-course/start-my-course.component';
import { MyCourseDashboardComponent } from './my-course-dashboard/my-course-dashboard.component';
import { CourseCertificateComponent } from './course-certificate/course-certificate.component';
import { SubmitedtestsComponent } from './submitedtests/submitedtests.component';
import { LearningPathDashboardComponent } from './learning-path-dashboard/learning-path-dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { ViewGroupComponent } from './view-group/view-group.component';
import { LearningDashboardComponent } from './learning-dashboard/learning-dashboard.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { EnrolledTrainingComponent } from './enrolled-training/enrolled-training.component';
import { TrainingHrsReportComponent } from './training-hrs-report/training-hrs-report.component';
import { LearningHistoryComponent } from './learning-history/learning-history.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    AttendanceNewComponent,
    AttendanceDetailsComponent,
    CatalogComponent,
    ViewCourseComponent,
    TakeAssessmentComponent,
    StartMyCourseNewComponent,
    StartMyCourseComponent,
    MyCourseDashboardComponent,
    CourseCertificateComponent,
    SubmitedtestsComponent,
    LearningPathDashboardComponent,
    ChatComponent,
    ViewGroupComponent,
    LearningDashboardComponent,
    EnrolledTrainingComponent,
    TrainingHrsReportComponent,
    LearningHistoryComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    CKEditorModule
  ]
})
export class EmployeeModule { }

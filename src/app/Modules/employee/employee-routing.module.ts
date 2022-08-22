import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { AttendanceNewComponent } from './attendance-new/attendance-new.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ChatComponent } from './chat/chat.component';
import { CourseCertificateComponent } from './course-certificate/course-certificate.component';
import { EmployeeComponent } from './employee.component';
import { EnrolledTrainingComponent } from './enrolled-training/enrolled-training.component';
import { LearningDashboardComponent } from './learning-dashboard/learning-dashboard.component';
import { LearningHistoryComponent } from './learning-history/learning-history.component';
import { LearningPathDashboardComponent } from './learning-path-dashboard/learning-path-dashboard.component';
import { MyCourseDashboardComponent } from './my-course-dashboard/my-course-dashboard.component';
import { StartMyCourseNewComponent } from './start-my-course-new/start-my-course-new.component';
import { StartMyCourseComponent } from './start-my-course/start-my-course.component';
import { SubmitedtestsComponent } from './submitedtests/submitedtests.component';
import { TakeAssessmentComponent } from './take-assessment/take-assessment.component';
import { TrainingHrsReportComponent } from './training-hrs-report/training-hrs-report.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { ViewGroupComponent } from './view-group/view-group.component';

const routes: Routes = [{ path: '', component: EmployeeComponent },
{path:'AttendanceDetails',component:AttendanceDetailsComponent},
{path:'AttendanceNew',component:AttendanceNewComponent},
{path:'Catalog',component:CatalogComponent},
{path:'CourseCertificate/:id',component:CourseCertificateComponent},
{path:'MyCourseDashboard',component:MyCourseDashboardComponent},
{path:'MyCourseDashboard/:id',component:MyCourseDashboardComponent},
{path:'StartMyCourse',component:StartMyCourseComponent},
{path:'StartMyCourseNew/:id',component:StartMyCourseNewComponent},
{path:'Submitedtests',component:SubmitedtestsComponent},
{path:'TakeAssessment/:courseid/:chapterid/:testtype',component:TakeAssessmentComponent},
{path:'ViewCourse/:id',component:ViewCourseComponent},
{path:'LearningPathDashboard',component:LearningPathDashboardComponent},
{path:'Chat/:id',component:ChatComponent},
{ path: 'ViewGroup', component: ViewGroupComponent},
{path:'LearningDashboard',component:LearningDashboardComponent},
{path:'EnrolledTraining',component:EnrolledTrainingComponent},
{path:'TrainingHrsReport',component:TrainingHrsReportComponent},
{path:'LearningHistory',component:LearningHistoryComponent}




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

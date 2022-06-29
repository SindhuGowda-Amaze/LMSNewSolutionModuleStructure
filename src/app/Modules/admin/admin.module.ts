import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryDashboardComponent } from './category-dashboard/category-dashboard.component';
import { CourseComponent } from './course/course.component';
import { CourseDashboardComponent } from './course-dashboard/course-dashboard.component';
import { ChapterComponent } from './chapter/chapter.component';
import { ChapterDashboardComponent } from './chapter-dashboard/chapter-dashboard.component';
import { TrainerComponent } from './trainer/trainer.component';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';
import { TrainerCouresMappingComponent } from './trainer-coures-mapping/trainer-coures-mapping.component';
import { TrainerCouresMappingFormComponent } from './trainer-coures-mapping-form/trainer-coures-mapping-form.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';


@NgModule({
  declarations: [
    AdminComponent,
    CategoryFormComponent,
    CategoryDashboardComponent,
    CourseComponent,
    CourseDashboardComponent,
    ChapterComponent,
    ChapterDashboardComponent,
    TrainerComponent,
    TrainerFormComponent,
    TrainerCouresMappingComponent,
    TrainerCouresMappingFormComponent,
    EmployeeComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

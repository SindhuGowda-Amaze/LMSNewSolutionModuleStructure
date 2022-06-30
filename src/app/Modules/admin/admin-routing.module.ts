
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CategoryDashboardComponent } from './category-dashboard/category-dashboard.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ChapterDashboardComponent } from './chapter-dashboard/chapter-dashboard.component';
import { ChapterComponent } from './chapter/chapter.component';
import { CourseDashboardComponent } from './course-dashboard/course-dashboard.component';
import { CourseComponent } from './course/course.component';
import { TrainerCouresMappingFormComponent } from './trainer-coures-mapping-form/trainer-coures-mapping-form.component';
import { TrainerCouresMappingComponent } from './trainer-coures-mapping/trainer-coures-mapping.component';
import { TrainerFormComponent } from './trainer-form/trainer-form.component';
import { TrainerComponent } from './trainer/trainer.component';

const routes: Routes = [{ path: '', component: AdminComponent },
{path:'CategoryForm',component:CategoryFormComponent},
{path:'CategoryDashboard',component:CategoryDashboardComponent},
{path:'CategoryDashboard/:id',component:CategoryDashboardComponent},

{path:'Chapter',component:ChapterComponent},
{path:'Chapter/:id',component:ChapterComponent},
{path:'ChapterDashboard',component:ChapterDashboardComponent},

{path:'Course',component:CourseComponent},
{path:'Course/:id',component:CourseComponent},
{path:'CourseDashboard',component:CourseDashboardComponent},


{path:'Trainer',component:TrainerComponent},
{path:'TrainerForm',component:TrainerFormComponent},
{path:'TrainerForm/:id',component:TrainerFormComponent},

{path:'TrainerCouresMapping',component:TrainerCouresMappingComponent},
{path:'TrainerCouresMappingForm',component:TrainerCouresMappingFormComponent},
{path:'TrainerCouresMappingForm/:id',component:TrainerCouresMappingFormComponent},






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

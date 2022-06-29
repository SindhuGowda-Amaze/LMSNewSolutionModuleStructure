import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { AttendanceNewComponent } from './attendance-new/attendance-new.component';
import { CatalogComponent } from './catalog/catalog.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [{ path: '', component: EmployeeComponent },
{path:'AttendanceDetails',component:AttendanceDetailsComponent},
{path:'AttendanceNew',component:AttendanceNewComponent},
{path:'Catalog',component:CatalogComponent}






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

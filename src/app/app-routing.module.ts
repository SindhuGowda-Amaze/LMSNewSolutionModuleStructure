import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Admin', loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule) }, 
  { path: 'Employee', loadChildren: () => import('./Modules/employee/employee.module').then(m => m.EmployeeModule) }, 
  { path: 'HR', loadChildren: () => import('./Modules/hr/hr.module').then(m => m.HRModule) }, 
  { path: 'Manager', loadChildren: () => import('./Modules/manager/manager.module').then(m => m.ManagerModule) }, 
  { path: 'Shared', loadChildren: () => import('./Modules/shared/shared.module').then(m => m.SharedModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

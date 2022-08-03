import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Admin', loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule) }, 
  { path: 'Employee', loadChildren: () => import('./Modules/employee/employee.module').then(m => m.EmployeeModule) }, 
  {path:'',loadChildren:() => import('./Modules/trainer/trainer.module').then(m =>m.TrainerModule)},

  { path: 'Manager', loadChildren: () => import('./Modules/manager/manager.module').then(m => m.ManagerModule) }, 
  { path: 'Shared', loadChildren: () => import('./Modules/shared/shared.module').then(m => m.SharedModule) },
  { path: 'Trainer', loadChildren: () => import('./Modules/trainer/trainer.module').then(m => m.TrainerModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Pages/CommonPages/footer/footer.component';
import { HeaderComponent } from './Pages/CommonPages/header/header.component';
import { SidebarComponent } from './Pages/CommonPages/sidebar/sidebar.component';
import { LoginComponent } from './Pages/login/login.component';
import { SharedModule } from './Modules/shared/shared.module';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CKEditorModule } from 'ckeditor4-angular';
import { AdminDashboardComponent } from './Modules/admin/admin-dashboard/admin-dashboard.component';
import { InterceptorService } from './interceptor';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    CKEditorModule,

    
  ],
  providers: [ DatePipe,
    {

      provide: HTTP_INTERCEPTORS,
  
      useClass: InterceptorService,
  
      multi: true
  
     },],
  bootstrap: [AppComponent]
})
export class AppModule { }

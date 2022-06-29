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
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [ DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Add this import
import { HttpClientModule } from '@angular/common/http'; // Add this import
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AnalyticsSectionComponent } from './analytics-section/analytics-section.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    AnalyticsSectionComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule ,// Add this line
    NgChartsModule,
    RouterModule.forRoot([
    ]),
    AppRoutingModule // Add this line
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

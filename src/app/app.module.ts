import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Add this import
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { AnalyticsSectionComponent } from './analytics-section/analytics-section.component';
import { WeeklyTrendChartComponent } from './weekly-trend-chart/weekly-trend-chart.component';
import { VisitsBarChartComponent } from './visits-bar-chart/visits-bar-chart.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    AnalyticsSectionComponent,
    WeeklyTrendChartComponent,
    VisitsBarChartComponent,
    OrdersComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule ,// Add this line
    NgChartsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),

    AppRoutingModule // Add this line
  

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

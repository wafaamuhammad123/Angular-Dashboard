import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { NgChartsModule } from 'ng2-charts';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';

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
import { OrderDetailsComponent } from './order-details/order-details.component';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'orders/:id', component: OrderDetailsComponent },
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
    OrderDetailsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    NgChartsModule,
    AppRoutingModule,
    DateRangePickerModule,
    RouterModule.forRoot(routes),

    AppRoutingModule 
  

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

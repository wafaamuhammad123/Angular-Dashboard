import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Metric } from '../shared/models/metric.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'https://mocki.io/v1/d75fa802-cff5-4867-906d-68ba8ef2d065';

  constructor(private http: HttpClient) {}

  getAnalyticsMetrics(): Observable<Metric[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const apiData = response.analytics || response;
        return this.transformApiData(apiData);
      }),
      catchError(error => {
        console.error('Error fetching analytics:', error);
        return of([]);
      })
    );
  }
  getRawAnalytics(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.analytics || response),
      catchError(error => {
        console.error('Error fetching raw analytics:', error);
        return of({});
      })
    );
  }
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>('https://mocki.io/v1/182f9d18-0f8d-41d9-8e90-887dbd0991c4').pipe(
      catchError(error => {
        console.error('Error fetching orders:', error);
        return of([]);
      })
    );
  }
  private transformApiData(apiData: any): Metric[] {
    return [
      {
        title: 'Total Revenue',
        value: apiData.totalRevenue,
        change: apiData.revenueChangePercentage || 0,
        icon: 'fa-dollar-sign',
        color: 'primary',
        isCurrency: true
      },
      {
        title: 'Today Revenue',
        value: apiData.todayRevenue || apiData.todaysRevenue, 
        change: apiData.dailyRevenueChange || 0,
        icon: 'fa-calendar-day',
        color: 'success',
        isCurrency: true
      },
      {
        title: 'Items Sold',
        value: apiData.itemsSold,
        change: apiData.itemsSoldChangePercentage || 0,
        icon: 'fa-shopping-bag',
        color: 'info'
      },
      {
        title: 'Orders Total',
        value: apiData.totalOrders,
        change: apiData.ordersChangePercentage || 0,
        icon: 'fa-clipboard-list',
        color: 'warning'
      }
    ];
  }
}
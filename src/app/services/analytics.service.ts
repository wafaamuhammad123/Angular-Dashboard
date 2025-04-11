import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Metric } from '../shared/models/metric.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'https://mocki.io/v1/388c90b9-df18-4525-ad8b-b17971714e16';

  constructor(private http: HttpClient) {}

  getAnalyticsMetrics(): Observable<Metric[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        // Access the analytics property from the response
        const apiData = response.analytics || response;
        return this.transformApiData(apiData);
      }),
      catchError(error => {
        console.error('Error fetching analytics:', error);
        return of([]);
      })
    );
  }

  private transformApiData(apiData: any): Metric[] {
    return [
      {
        title: 'Total Revenue',
        value: apiData.totalRevenue,
        change: apiData.revenueChangePercentage || 0, // Default to 0 if undefined
        icon: 'fa-dollar-sign',
        color: 'primary',
        isCurrency: true
      },
      {
        title: 'Today Revenue',
        value: apiData.todayRevenue || apiData.todaysRevenue, // Handle both spellings
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
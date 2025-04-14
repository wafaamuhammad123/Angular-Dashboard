import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Metric } from '../shared/models/metric.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = 'https://mocki.io/v1/f4ad315b-3c69-4884-9d2e-92317f3f130b';

  constructor(private http: HttpClient) {}

  getAnalyticsMetrics(dateRange?: Date[]): Observable<Metric[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const apiData = response.analytics || response;
                if (dateRange) {
          apiData.weeklyTrend = this.filterDataByDate(apiData.weeklyTrend, dateRange);
          apiData.visits = this.filterDataByDate(apiData.visits, dateRange);

        }
        
        return this.transformApiData(apiData);
      }),
      catchError(error => {
        console.error('Error fetching analytics:', error);
        return of([]);
      })
    );
  }

getRawAnalytics(dateRange?: Date[]): Observable<any> {
  return this.http.get<any>(this.apiUrl).pipe(
    map(response => {
      const data = response.analytics || response;
      
      if (dateRange) {
        console.log('Filtering with range:', dateRange);
        const filteredVisits = this.filterDataByDate(data.visits, dateRange);
        const filteredTrend = this.filterDataByDate(data.weeklyTrend, dateRange);
        
        console.log('Original visits:', data.visits.length, 'Filtered:', filteredVisits.length);
        console.log('Original trend:', data.weeklyTrend.length, 'Filtered:', filteredTrend.length);
        
        return {
          ...data,
          visits: filteredVisits,
          weeklyTrend: filteredTrend
        };
      }
      return data;
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
  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get<any[]>('https://mocki.io/v1/182f9d18-0f8d-41d9-8e90-887dbd0991c4').pipe(
      map(orders => orders.find(order => order.id === orderId)),
      catchError(error => {
        console.error('Error fetching order details:', error);
        return of(null);
      })
    );
  }

  private filterDataByDate(data: any[], dateRange: Date[]): any[] {
    if (!data || !dateRange) return data;
  
    const startStr = dateRange[0].toISOString().split('T')[0];
    const endStr = dateRange[1].toISOString().split('T')[0];
  
    console.log('Filtering between:', startStr, 'and', endStr);
    console.log('Sample item date:', data[0]?.date);
  
    return data.filter(item => {
      const itemDateStr = item.date;
      const isInRange = itemDateStr >= startStr && itemDateStr <= endStr;
      console.log(`Item ${item.date}:`, isInRange);
      return isInRange;
    });
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
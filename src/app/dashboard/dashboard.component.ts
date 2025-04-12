import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { Metric } from '../shared/models/metric.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  metrics: Metric[] = [];
  isLoading = true;
  error: string | null = null;
  weeklyTrendData: { day: string; value: number }[] = [];
  visitsData: { day: string; visits: number }[] = [];
  orders: any[] = [];
  displayedColumns: string[] = ['id', 'itemName', 'quantity', 'date', 'price', 'status'];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadMetrics();
    this.loadOrders();

  }
  loadOrders(): void {
    this.analyticsService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
      }
    });
  }

  loadMetrics(): void {
    this.analyticsService.getAnalyticsMetrics().subscribe({
      next: (metrics) => {
        this.metrics = metrics;
        this.isLoading = false;
  
        this.analyticsService.getRawAnalytics().subscribe(data => {
          console.log('Raw analytics data:', data); 
          this.weeklyTrendData = data.weeklyTrend;
          this.visitsData = data.visits;
          console.log('Weekly trend:', this.weeklyTrendData); 
          console.log('Visits data:', this.visitsData); 
        });
      },
      error: (err) => {
        this.error = 'Failed to load analytics data.';
        this.isLoading = false;
      }
    });
  }

  getChangeClass(change: number): string {
    return change >= 0 ? 'positive' : 'negative';
  }

  formatValue(metric: Metric): string {
    if (metric.isCurrency) {
      return '$' + metric.value.toLocaleString();
    }
    return metric.value.toLocaleString();
  }

  formatChange(change: number): string {
    return change >= 0 ? `+${change}%` : `${change}%`;
  }
}
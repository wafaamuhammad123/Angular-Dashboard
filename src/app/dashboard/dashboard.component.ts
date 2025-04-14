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

  selectedRange: string = 'Today';
  dateRange: Date[] = [new Date(), new Date()];
  presets: any[] = [
    { label: 'Today', value: 'Today' },
    { label: 'Yesterday', value: 'Yesterday' },
    { label: 'This Week', value: 'This Week' },
    { label: 'Last Week', value: 'Last Week' },
    { label: 'This Month', value: 'This Month' },
    { label: 'Custom', value: 'Custom' }
  ];

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

  loadMetrics(dateRange?: Date[]): void {
    this.isLoading = true;
    this.error = null;

    this.analyticsService.getAnalyticsMetrics(dateRange).subscribe({
      next: (metrics) => {
        this.metrics = metrics;
        this.isLoading = false;
  
        this.analyticsService.getRawAnalytics(dateRange).subscribe({
          next: (data) => {
            this.weeklyTrendData = data.weeklyTrend;
            this.visitsData = data.visits;
          },
          error: (err) => {
            console.error('Failed to load raw analytics:', err);
          }
        });
      },
      error: (err) => {
        this.error = 'Failed to load analytics data.';
        this.isLoading = false;
      }
    });
  }

onRangeChange(range: string): void {
  this.selectedRange = range;
  
  const apiStartDate = new Date('2023-11-20');
  const apiEndDate = new Date('2023-11-26');
  const today = new Date('2023-11-26');

  switch (range) {
    case 'Today':
      this.dateRange = [new Date(today), new Date(today)];
      break;
    case 'Yesterday':
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      this.dateRange = [yesterday, yesterday];
      break;
    case 'This Week':
      this.dateRange = [new Date(apiStartDate), new Date(today)];
      break;
    case 'Last Week':
      this.dateRange = [new Date(apiStartDate), new Date(apiEndDate)];
      break;
    case 'This Month':
      this.dateRange = [new Date(apiStartDate), new Date(today)];
      break;
    case 'Custom':
      return;
  }

  this.loadMetrics(this.dateRange);
}
  onDateRangeChange(event: any): void {
    this.dateRange = event.value;
    this.selectedRange = 'Custom';
    this.loadMetrics(this.dateRange);
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
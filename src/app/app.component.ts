import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './services/analytics.service';
import { Metric } from './shared/models/metric.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  metrics: Metric[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadMetrics();
  }

  loadMetrics(): void {
    this.isLoading = true;
    this.error = null;

    this.analyticsService.getAnalyticsMetrics().subscribe({
      next: (metrics) => {
        this.metrics = metrics;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load analytics data. Please try again.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  // These methods can be moved to your analytics-section component if needed
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




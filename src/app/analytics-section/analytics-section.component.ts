import { Component, Input } from '@angular/core';
import { Metric } from '../shared/models/metric.model';

@Component({
  selector: 'app-analytics-section',
  templateUrl: './analytics-section.component.html',
  styleUrls: ['./analytics-section.component.css']
})
export class AnalyticsSectionComponent {
  @Input() metrics: Metric[] = [];
  
  getChangeClass(change: number): string {
    if (change === 0) return 'neutral';
    return change > 0 ? 'positive' : 'negative';
  }

  formatValue(metric: Metric): string {
    if (!metric || metric.value === undefined || metric.value === null) return 'N/A';
    
    try {
      if (metric.isCurrency) {
        return '$' + Number(metric.value).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
      }
      return Number(metric.value).toLocaleString('en-US');
    } catch (e) {
      console.warn('Formatting error:', e);
      return metric.value.toString();
    }
  }

  formatChange(change: number): string {
    if (change === 0) return '±0%';
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  }
}
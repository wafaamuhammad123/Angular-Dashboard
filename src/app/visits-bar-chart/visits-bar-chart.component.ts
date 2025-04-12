import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import type { ChartType } from 'chart.js';

@Component({
  selector: 'app-visits-bar-chart',
  templateUrl: './visits-bar-chart.component.html',
  styleUrls: ['./visits-bar-chart.component.css']
})
export class VisitsBarChartComponent implements OnChanges {
  @Input() visitsData: { day: string; visits: number }[] = [];

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  barChartType: 'bar' = 'bar';

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Daily Visits',
        backgroundColor: '#42A5F5'
      }
    ]
  };

  ngOnChanges(): void {
    if (this.visitsData?.length) {
      this.barChartData = {
        labels: this.visitsData.map(d => d.day),
        datasets: [
          {
            data: this.visitsData.map(d => d.visits),
            label: 'Daily Visits',
            backgroundColor: '#42A5F5'
          }
        ]
      };
    }
  }
}

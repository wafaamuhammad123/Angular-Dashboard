import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-weekly-trend-chart',
  templateUrl: './weekly-trend-chart.component.html',
})
export class WeeklyTrendChartComponent implements OnChanges {
  @Input() trendData: { day: string; value: number }[] = [];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Revenue',
        fill: true,
        tension: 0.5,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.2)',
      },
    ],
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  lineChartType: ChartType = 'line';

  ngOnChanges() {
    if (this.trendData?.length) {
      this.lineChartData = {
        labels: this.trendData.map((d) => d.day),
        datasets: [
          {
            data: this.trendData.map((d) => d.value),
            label: 'Revenue',
            fill: true,
            tension: 0.5,
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66,165,245,0.2)',
          },
        ],
      };
    }
  }
}

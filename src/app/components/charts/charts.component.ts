import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartDataset } from '../../shared/models/analytics.service';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [MatCardModule, NgChartsModule],
  template: `
    <mat-card class="chart-card">
      <div class="chart-header">
        <div>
          <h3 class="chart-title">Revenue vs Target</h3>
          <p class="chart-sub">Monthly performance — current year</p>
        </div>
      </div>
      <div class="chart-container">
        <canvas baseChart
          [data]="chartData"
          [options]="chartOptions"
          [legend]="false"
          type="line">
        </canvas>
      </div>
    </mat-card>
  `,
  styles: [`
    .chart-card { padding: 16px; }
    .chart-header { margin-bottom: 16px; }
    .chart-title { font-size: 16px; font-weight: 600; margin: 0; }
    .chart-sub { font-size: 12px; color: #666; margin: 0; }
    .chart-container { height: 300px; position: relative; }
  `],
})
export class RevenueChartComponent {
  @Input() rawData!: { labels: string[]; datasets: ChartDataset[] };

  chartData: any;
  chartOptions: any;

  ngOnChanges(): void {
    if (this.rawData) {
      this.chartData = this.rawData;
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      };
    }
  }
}

@Component({
  selector: 'app-traffic-chart',
  standalone: true,
  imports: [MatCardModule, NgChartsModule],
  template: `
    <mat-card class="chart-card">
      <div class="chart-header">
        <div>
          <h3 class="chart-title">Traffic Sources</h3>
          <p class="chart-sub">Breakdown by channel</p>
        </div>
      </div>
      <div class="chart-container">
        <canvas baseChart
          [data]="chartData"
          [options]="chartOptions"
          [legend]="true"
          type="doughnut">
        </canvas>
      </div>
    </mat-card>
  `,
  styles: [`
    .chart-card { padding: 16px; }
    .chart-header { margin-bottom: 16px; }
    .chart-title { font-size: 16px; font-weight: 600; margin: 0; }
    .chart-sub { font-size: 12px; color: #666; margin: 0; }
    .chart-container { height: 300px; position: relative; }
  `],
})
export class TrafficChartComponent {
  @Input() sources: { label: string; value: number; color: string }[] = [];

  chartData: any;
  chartOptions: any;

  ngOnChanges(): void {
    if (this.sources) {
      this.chartData = {
        labels: this.sources.map(s => s.label),
        datasets: [{
          data: this.sources.map(s => s.value),
          backgroundColor: this.sources.map(s => s.color),
          borderColor: 'transparent',
          hoverOffset: 6,
        }],
      };
      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
      };
    }
  }
}

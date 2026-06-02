import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

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
        <div class="legend">
          @for (ds of chartData.datasets; track ds.label) {
            <span class="legend-item">
              <span class="dot" [style.background]="ds.borderColor?.toString()"></span>
              {{ ds.label }}
            </span>
          }
        </div>
      </div>
      <div class="chart-wrap">
        <canvas baseChart
          [data]="chartData"
          [options]="chartOptions"
          type="line">
        </canvas>
      </div>
    </mat-card>
  `,
  styles: [`
    .chart-card { padding: 20px !important; }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .chart-title { font-size: 16px; font-weight: 600; color: var(--text-primary); }
    .chart-sub   { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

    .legend {
      display: flex;
      gap: 16px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--text-muted);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }

    .chart-wrap { height: 280px; position: relative; }
  `],
})
export class RevenueChartComponent implements OnInit {
  @Input() rawData!: { labels: string[]; datasets: any[] };

  chartData!: ChartData<'line'>;

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1c2330',
        borderColor: 'rgba(255,255,255,.1)',
        borderWidth: 1,
        titleColor: '#e6edf3',
        bodyColor: '#7d8590',
        padding: 12,
        callbacks: {
          label: ctx => ` $${(ctx.raw as number).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,.04)' },
        ticks: { color: '#7d8590', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(255,255,255,.04)' },
        ticks: {
          color: '#7d8590',
          font: { size: 11 },
          callback: val => `$${(+val / 1000).toFixed(0)}k`,
        },
      },
    },
  };

  ngOnInit(): void {
    this.chartData = {
      labels: this.rawData.labels,
      datasets: this.rawData.datasets,
    };
  }
}


// ── Doughnut traffic chart ────────────────────────────────────────────────
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
      <div class="chart-wrap">
        <canvas baseChart [data]="chartData" [options]="chartOptions" type="doughnut"></canvas>
      </div>
      <div class="traffic-legend">
        @for (src of sources; track src.label) {
          <div class="traffic-item">
            <span class="dot" [style.background]="src.color"></span>
            <span class="traffic-label">{{ src.label }}</span>
            <span class="traffic-val">{{ src.value }}%</span>
          </div>
        }
      </div>
    </mat-card>
  `,
  styles: [`
    .chart-card { padding: 20px !important; }
    .chart-header { margin-bottom: 16px; }
    .chart-title { font-size: 16px; font-weight: 600; color: var(--text-primary); }
    .chart-sub   { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
    .chart-wrap  { height: 180px; position: relative; margin-bottom: 16px; }

    .traffic-legend { display: flex; flex-direction: column; gap: 8px; }

    .traffic-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .traffic-label { font-size: 13px; color: var(--text-muted); flex: 1; }
    .traffic-val   { font-size: 13px; font-family: var(--font-mono); color: var(--text-primary); font-weight: 600; }
  `],
})
export class TrafficChartComponent {
  @Input() sources: { label: string; value: number; color: string }[] = [];

  get chartData(): ChartData<'doughnut'> {
    return {
      labels: this.sources.map(s => s.label),
      datasets: [{
        data: this.sources.map(s => s.value),
        backgroundColor: this.sources.map(s => s.color),
        borderColor: 'transparent',
        hoverOffset: 6,
      }],
    };
  }

  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1c2330',
        titleColor: '#e6edf3',
        bodyColor: '#7d8590',
        callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` },
      },
    },
  };
}

import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { DecimalPipe } from '@angular/common';

import { AnalyticsService, KpiCard } from '../../shared/models/analytics.service';
import { KpiCardsComponent } from '../../components/cards/kpi-cards.component';
import { RevenueChartComponent, TrafficChartComponent } from '../../components/charts/charts.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatCardModule, MatTableModule, MatChipsModule, DecimalPipe,
    KpiCardsComponent, RevenueChartComponent, TrafficChartComponent,
  ],
  template: `
    <div class="dashboard">

      <!-- KPI row -->
      <app-kpi-cards [cards]="kpiCards" />

      <!-- Charts row -->
      <div class="charts-row">
        <div class="chart-main">
          <app-revenue-chart [rawData]="revenueData" />
        </div>
        <div class="chart-side">
          <app-traffic-chart [sources]="trafficSources" />
        </div>
      </div>

      <!-- Table -->
      <mat-card class="table-card">
        <div class="table-header">
          <div>
            <h3 class="section-title">Top Pages</h3>
            <p class="section-sub">Last 30 days</p>
          </div>
          <mat-chip-set>
            <mat-chip>This month</mat-chip>
          </mat-chip-set>
        </div>

        <table mat-table [dataSource]="topPages" class="pages-table">
          <ng-container matColumnDef="page">
            <th mat-header-cell *matHeaderCellDef>Page</th>
            <td mat-cell *matCellDef="let row">
              <code class="page-path">{{ row.page }}</code>
            </td>
          </ng-container>

          <ng-container matColumnDef="views">
            <th mat-header-cell *matHeaderCellDef>Views</th>
            <td mat-cell *matCellDef="let row">{{ row.views | number }}</td>
          </ng-container>

          <ng-container matColumnDef="bounce">
            <th mat-header-cell *matHeaderCellDef>Bounce Rate</th>
            <td mat-cell *matCellDef="let row">
              <span class="bounce-badge" [class.high]="bounceHigh(row.bounce)">
                {{ row.bounce }}
              </span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card>

    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .charts-row {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 20px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }

    .chart-main, .chart-side { min-width: 0; }

    /* Table card */
    .table-card { padding: 20px !important; }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .section-title { font-size: 16px; font-weight: 600; color: var(--text-primary); }
    .section-sub   { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

    .pages-table {
      width: 100%;
      background: transparent !important;

      th { color: var(--text-muted) !important; font-size: 11px; letter-spacing: .5px; text-transform: uppercase; border-bottom-color: var(--border) !important; }
      td { color: var(--text-primary) !important; border-bottom-color: var(--border) !important; font-size: 13px; }
      tr:last-child td { border-bottom: none !important; }
    }

    .page-path {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--teal-light);
      background: rgba(0,137,123,.08);
      padding: 2px 8px;
      border-radius: 4px;
    }

    .bounce-badge {
      font-family: var(--font-mono);
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 20px;
      background: rgba(63,185,80,.12);
      color: var(--success);

      &.high {
        background: rgba(248,81,73,.12);
        color: var(--danger);
      }
    }
  `],
})
export class DashboardPageComponent implements OnInit {
  kpiCards: KpiCard[] = [];
  revenueData: any;
  trafficSources: any[] = [];
  topPages: any[] = [];
  displayedColumns = ['page', 'views', 'bounce'];

  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.kpiCards      = this.analytics.getKpiCards();
    this.revenueData   = this.analytics.getRevenueChartData();
    this.trafficSources = this.analytics.getTrafficSources();
    this.topPages      = this.analytics.getTopPages();
  }

  bounceHigh(val: string): boolean {
    return parseInt(val) >= 50;
  }
}

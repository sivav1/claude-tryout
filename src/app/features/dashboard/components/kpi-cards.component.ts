import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { KpiCard } from '../../shared/models/analytics.service';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgStyle],
  template: `
    <div class="kpi-grid">
      @for (card of cards; track card.label) {
        <mat-card class="kpi-card">
          <div class="kpi-icon" [ngStyle]="{ background: card.color + '22', color: card.color }">
            <mat-icon>{{ card.icon }}</mat-icon>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">{{ card.label }}</span>
            <span class="kpi-value">{{ card.value }}</span>
            <span class="kpi-change" [class.up]="card.change > 0" [class.down]="card.change < 0">
              <mat-icon>{{ card.change >= 0 ? 'arrow_upward' : 'arrow_downward' }}</mat-icon>
              {{ card.change | number:'1.1-1' }}% vs last month
            </span>
          </div>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .kpi-card {
      padding: 20px !important;
      display: flex !important;
      flex-direction: row !important;
      align-items: center;
      gap: 16px;
      transition: transform .15s;

      &:hover { transform: translateY(-2px); }
    }

    .kpi-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      mat-icon { font-size: 22px; }
    }

    .kpi-body {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }

    .kpi-label {
      font-size: 12px;
      color: var(--text-muted);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: .5px;
    }

    .kpi-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1;
    }

    .kpi-change {
      display: flex;
      align-items: center;
      gap: 2px;
      font-size: 11px;
      font-family: var(--font-mono);

      mat-icon { font-size: 12px; width: 12px; height: 12px; }

      &.up   { color: var(--success); }
      &.down { color: var(--danger);  }
    }
  `],
})
export class KpiCardsComponent {
  @Input() cards: KpiCard[] = [];
}

import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { KpiCard } from '../../shared/models/analytics.service';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <div class="kpi-grid">
      @for (card of cards; track card.label) {
        <mat-card class="kpi-card">
          <div class="kpi-icon" [ngStyle]="{ background: card.color + '22', color: card.color }">
            <mat-icon>{{ card.icon }}</mat-icon>
          </div>
          <div class="kpi-content">
            <div class="kpi-label">{{ card.label }}</div>
            <div class="kpi-value">{{ card.value }}</div>
            <div class="kpi-change" [ngStyle]="{ color: card.change >= 0 ? '#4caf50' : '#f44336' }">
              {{ card.change | number:'1.1-1' }}%
            </div>
          </div>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .kpi-card {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .kpi-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .kpi-icon mat-icon {
      font-size: 24px;
    }
    .kpi-content {
      flex: 1;
    }
    .kpi-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 4px;
    }
    .kpi-value {
      font-size: 18px;
      font-weight: 600;
    }
    .kpi-change {
      font-size: 12px;
      margin-top: 4px;
    }
  `],
})
export class KpiCardsComponent {
  @Input() cards: KpiCard[] = [];
}

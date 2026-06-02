import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,      // provides built‑in pipes such as date
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  template: `
    <mat-toolbar class="header">
      <div class="header-left">
        <h1 class="page-title">Overview</h1>
        <span class="breadcrumb">Dashboard / Overview</span>
      </div>

      <div class="header-actions">
        <span class="date-pill">{{ today | date:'MMM d, yyyy' }}</span>

        <button mat-icon-button aria-label="Search">
          <mat-icon>search</mat-icon>
        </button>

        <button mat-icon-button aria-label="Notifications"
                [matBadge]="3" matBadgeColor="warn" matBadgeSize="small">
          <mat-icon>notifications_none</mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .header {
      height: 60px;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .header-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .page-title {
      font-size: 18px;
      font-weight: 700;
      line-height: 1;
      color: var(--text-primary);
    }

    .breadcrumb {
      font-size: 11px;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .date-pill {
      font-size: 12px;
      font-family: var(--font-mono);
      color: var(--text-muted);
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      padding: 4px 10px;
      border-radius: 20px;
    }

    mat-icon { color: var(--text-muted); }
  `],
})
export class HeaderComponent {
  today = new Date();
}

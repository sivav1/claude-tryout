import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  standalone: true,
  template: `
    <div class="placeholder">
      <h2>Analytics</h2>
      <p>Deep-dive analytics charts go here.</p>
    </div>
  `,
  styles: [`
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 60vh;
      gap: 12px;
      color: var(--text-muted);

      h2 { font-size: 24px; color: var(--text-primary); }
    }
  `],
})
export class AnalyticsComponent {}

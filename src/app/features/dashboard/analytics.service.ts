import { Injectable } from '@angular/core';

export interface KpiCard {
  label: string;
  value: string;
  change: number;     // percentage, positive = up
  icon: string;
  color: string;
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
  tension: number;
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  getKpiCards(): KpiCard[] {
    return [
      { label: 'Total Revenue',    value: '$284,392', change: +12.4, icon: 'attach_money',    color: '#00897b' },
      { label: 'Active Users',     value: '18,429',   change:  +8.1, icon: 'group',           color: '#f0a500' },
      { label: 'Conversion Rate',  value: '4.73%',    change:  -1.2, icon: 'trending_up',     color: '#7c3aed' },
      { label: 'Avg. Session',     value: '3m 42s',   change:  +5.6, icon: 'timer',           color: '#0891b2' },
    ];
  }

  getRevenueChartData() {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datasets: ChartDataset[] = [
      {
        label: 'Revenue',
        data: [42000, 53000, 48000, 61000, 55000, 72000,
               68000, 79000, 83000, 91000, 87000, 95000],
        borderColor: '#00897b',
        backgroundColor: 'rgba(0,137,123,.12)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Target',
        data: [50000, 55000, 55000, 65000, 65000, 70000,
               75000, 75000, 80000, 85000, 90000, 95000],
        borderColor: '#f0a500',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
      },
    ];
    return { labels, datasets };
  }

  getTrafficSources(): { label: string; value: number; color: string }[] {
    return [
      { label: 'Organic Search', value: 41, color: '#00897b' },
      { label: 'Direct',         value: 24, color: '#f0a500' },
      { label: 'Referral',       value: 18, color: '#7c3aed' },
      { label: 'Social',         value: 12, color: '#0891b2' },
      { label: 'Email',          value:  5, color: '#f85149' },
    ];
  }

  getTopPages(): { page: string; views: number; bounce: string }[] {
    return [
      { page: '/home',        views: 14820, bounce: '38%' },
      { page: '/products',    views:  9304, bounce: '42%' },
      { page: '/pricing',     views:  6711, bounce: '29%' },
      { page: '/blog',        views:  5230, bounce: '55%' },
      { page: '/contact',     views:  3198, bounce: '61%' },
    ];
  }
}

// ── KPI / cards ─────────────────────────────────────────────────────────────
export interface KpiCard {
  label: string;
  value: string;
  change: number;   // percentage; positive = up
  icon: string;
  color: string;
}

// ── Charts ───────────────────────────────────────────────────────────────────
export interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
  tension: number;
}

export interface RevenueChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// ── Traffic ──────────────────────────────────────────────────────────────────
export interface TrafficSource {
  label: string;
  value: number;
  color: string;
}

// ── Pages table ──────────────────────────────────────────────────────────────
export interface PageStat {
  page: string;
  views: number;
  bounce: string;
}

// ── API response wrapper ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// ── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatarInitials: string;
}

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    // canActivate: [authGuard],   // ← uncomment when auth is wired up
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: 'analytics',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./features/analytics/analytics.routes').then(m => m.ANALYTICS_ROUTES),
  },
  {
    path: 'reports',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./features/reports/reports.routes').then(m => m.REPORTS_ROUTES),
  },
  {
    path: 'users',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./features/users/users.routes').then(m => m.USERS_ROUTES),
  },

  { path: '**', redirectTo: 'dashboard' },
];

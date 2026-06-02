import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatRippleModule],
  template: `
    <aside class="sidebar">
      <!-- Logo -->
      <div class="logo">
        <span class="logo-mark">◈</span>
        <span class="logo-text">Prism</span>
      </div>

      <!-- Nav -->
      <nav class="nav">
        <p class="nav-label">Main</p>
        @for (item of navItems; track item.route) {
          <a
            class="nav-item"
            matRipple
            [routerLink]="item.route"
            routerLinkActive="active"
          >
            <mat-icon>{{ item.icon }}</mat-icon>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>

      <!-- Footer -->
      <div class="sidebar-footer">
        <div class="avatar">JD</div>
        <div class="user-info">
          <span class="user-name">Jane Doe</span>
          <span class="user-role">Admin</span>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 20px 12px;
      gap: 8px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px 20px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 8px;
    }

    .logo-mark {
      font-size: 22px;
      color: var(--accent);
      line-height: 1;
    }

    .logo-text {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: var(--text-primary);
    }

    .nav-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text-muted);
      padding: 8px 12px 4px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 8px;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color .15s, background .15s;
      cursor: pointer;

      mat-icon { font-size: 20px; width: 20px; height: 20px; }

      &:hover { color: var(--text-primary); background: var(--bg-elevated); }

      &.active {
        color: var(--teal-light);
        background: rgba(0, 137, 123, .12);

        mat-icon { color: var(--teal-light); }
      }
    }

    .sidebar-footer {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-top: 1px solid var(--border);
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--teal);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      flex-shrink: 0;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .user-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
    .user-role { font-size: 11px; color: var(--text-muted); }
  `],
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard',  icon: 'dashboard',      route: '/dashboard' },
    { label: 'Analytics',  icon: 'bar_chart',       route: '/analytics' },
    { label: 'Reports',    icon: 'description',     route: '/reports' },
    { label: 'Users',      icon: 'group',           route: '/users' },
    { label: 'Settings',   icon: 'settings',        route: '/settings' },
  ];
}

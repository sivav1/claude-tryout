import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: 'primary' | 'accent' | 'warn';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  statCards: StatCard[] = [
    { title: 'Users', value: '1,234', icon: 'people', color: 'primary' },
    { title: 'Sales', value: '$45,678', icon: 'shopping_cart', color: 'accent' },
    { title: 'Performance', value: '89%', icon: 'speed', color: 'warn' },
    { title: 'Tasks', value: '56', icon: 'task_alt', color: 'primary' }
  ];
}

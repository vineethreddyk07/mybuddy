import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent implements OnInit {
  // Mock data for analytics
  kpis = [
    { title: 'Total Claims', value: '12,450', change: '+12.5%', trend: 'up' },
    { title: 'Approval Rate', value: '78.3%', change: '+3.2%', trend: 'up' },
    { title: 'Avg Processing Time', value: '4.2 days', change: '-0.8 days', trend: 'down' },
    { title: 'Customer Satisfaction', value: '4.6/5', change: '+0.2', trend: 'up' }
  ];

  // Mock data for charts
  chartData = {
    claimsByMonth: [
      { month: 'Jan', value: 850 },
      { month: 'Feb', value: 920 },
      { month: 'Mar', value: 1050 },
      { month: 'Apr', value: 980 },
      { month: 'May', value: 1120 },
      { month: 'Jun', value: 1080 }
    ],
    processingTimeByTeam: [
      { team: 'Team A', value: 3.8 },
      { team: 'Team B', value: 4.2 },
      { team: 'Team C', value: 5.1 },
      { team: 'Team D', value: 3.5 },
      { team: 'Team E', value: 4.0 }
    ],
    claimStatusDistribution: [
      { status: 'Paid', value: 45 },
      { status: 'Denied', value: 25 },
      { status: 'Partial', value: 20 },
      { status: 'Pending', value: 10 }
    ]
  };

  // Mock data for leaderboard
  leaderboard = [
    { rank: 1, name: 'John Doe', team: 'Team A', claimsProcessed: 145, accuracy: 98.5 },
    { rank: 2, name: 'Jane Smith', team: 'Team B', claimsProcessed: 132, accuracy: 97.8 },
    { rank: 3, name: 'Bob Johnson', team: 'Team C', claimsProcessed: 128, accuracy: 96.2 },
    { rank: 4, name: 'Alice Brown', team: 'Team A', claimsProcessed: 125, accuracy: 99.1 },
    { rank: 5, name: 'Charlie Wilson', team: 'Team B', claimsProcessed: 120, accuracy: 95.7 }
  ];

  constructor() {}

  ngOnInit(): void {
    // In a real app, we would fetch data from a service
  }

  // Helper methods for KPIs
  getTrendClass(trend: string): string {
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted';
  }

  getTrendIcon(trend: string): string {
    return trend === 'up' ? 'bi bi-arrow-up' : trend === 'down' ? 'bi bi-arrow-down' : 'bi bi-dash';
  }
}
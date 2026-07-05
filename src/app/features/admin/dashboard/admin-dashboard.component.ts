import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  // Mock data for cards
  stats = [
    { title: 'Total Users', value: '1,234', icon: 'bi bi-people', color: 'primary' },
    { title: 'Active Users', value: '987', icon: 'bi bi-check-circle', color: 'success' },
    { title: 'Total Claims', value: '5,678', icon: 'bi bi-file-earmark-text', color: 'info' },
    { title: 'Pending Claims', value: '123', icon: 'bi bi-hourglass-bottom', color: 'warning' },
    { title: 'Completed Claims', value: '4,567', icon: 'bi bi-check-circle-fill', color: 'success' },
    { title: 'Teams', value: '45', icon: 'bi bi-collection', color: 'secondary' }
  ];

  // Mock data for charts (we'll just show placeholders)
  chartData = {
    claimsByStatus: [
      { name: 'Paid', value: 45 },
      { name: 'Denied', value: 25 },
      { name: 'Partial', value: 20 },
      { name: 'Pending', value: 10 }
    ],
    claimsByTeam: [
      { name: 'Team A', value: 30 },
      { name: 'Team B', value: 25 },
      { name: 'Team C', value: 20 },
      { name: 'Team D', value: 15 },
      { name: 'Team E', value: 10 }
    ],
    weeklyProductivity: [
      { day: 'Mon', value: 15 },
      { day: 'Tue', value: 22 },
      { day: 'Wed', value: 18 },
      { day: 'Thu', value: 25 },
      { day: 'Fri', value: 20 },
      { day: 'Sat', value: 10 },
      { day: 'Sun', value: 5 }
    ]
  };

  // Mock data for recent activity table
  recentActivity = [
    { id: 1, user: 'John Doe', action: 'Created Claim', claimId: 'CLM-00123', time: '2 min ago' },
    { id: 2, user: 'Jane Smith', action: 'Updated Claim', claimId: 'CLM-00122', time: '15 min ago' },
    { id: 3, user: 'Bob Johnson', action: 'Deleted Claim', claimId: 'CLM-00121', time: '1 hour ago' },
    { id: 4, user: 'Alice Brown', action: 'Created Claim', claimId: 'CLM-00120', time: '2 hours ago' },
    { id: 5, user: 'Charlie Wilson', action: 'Updated Profile', claimId: '-', time: '3 hours ago' }
  ];

  constructor() {}

  ngOnInit(): void {
    // In a real app, we would fetch data from a service
  }
}
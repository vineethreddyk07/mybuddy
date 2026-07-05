import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent implements OnInit {
  // Mock data for cards
  stats = [
    { title: 'Pending Claims', value: '23', icon: 'bi bi-hourglass-bottom', color: 'warning' },
    { title: 'In Progress Claims', value: '15', icon: 'bi bi-arrow-repeat', color: 'info' },
    { title: 'Completed Claims', value: '187', icon: 'bi bi-check-circle-fill', color: 'success' },
    { title: 'Today\'s Target', value: '8', icon: 'bi bi-target', color: 'primary' },
    { title: 'Monthly Target', value: '150', icon: 'bi bi-calendar-check', color: 'secondary' }
  ];

  // Mock data for recent claims table
  recentClaims = [
    { id: 1, claimId: 'CLM-00123', patientName: 'John Doe', payer: 'Aetna', status: 'Pending', date: '2026-05-30', amount: '$2,450.00' },
    { id: 2, claimId: 'CLM-00122', patientName: 'Jane Smith', payer: 'Medicare', status: 'In Progress', date: '2026-05-29', amount: '$1,200.00' },
    { id: 3, claimId: 'CLM-00121', patientName: 'Bob Johnson', payer: 'UnitedHealthcare', status: 'Completed', date: '2026-05-28', amount: '$3,200.00' },
    { id: 4, claimId: 'CLM-00120', patientName: 'Alice Brown', payer: 'Cigna', status: 'Pending', date: '2026-05-27', amount: '$1,800.00' },
    { id: 5, claimId: 'CLM-00119', patientName: 'Charlie Wilson', payer: 'Aetna', status: 'In Progress', date: '2026-05-26', amount: '$2,100.00' }
  ];

  constructor() {}

  ngOnInit(): void {
    // In a real app, we would fetch data from a service
  }

  // Helper methods for badges
  getStatusColor(status: string): string {
    switch (status) {
      case 'Pending': return 'warning';
      case 'In Progress': return 'info';
      case 'Completed': return 'success';
      case 'Denied': return 'danger';
      case 'Partial': return 'secondary';
      default: return 'light';
    }
  }
}
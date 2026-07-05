import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  // Mock user profile data
  profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mybuddy.com',
    phone: '(555) 123-4567',
    role: 'User',
    team: 'Team A',
    employeeId: 'EMP001',
    hireDate: '2023-06-15',
    address: '123 Main St, Anytown, USA',
    bio: 'Experienced claims processor with 5 years of experience in healthcare insurance.'
  };

  // Mock data for security tab
  security = {
    lastLogin: '2026-05-30 08:30 AM',
    loginCount: 142,
    passwordChanged: '2026-05-01',
    mfaEnabled: false,
    notifications: {
      email: true,
      sms: false,
      push: true
    }
  };

  // Mock data for notifications tab
  notifications = [
    { id: 1, message: 'Your claim CLM-00123 has been approved', time: '2 hours ago', read: false },
    { id: 2, message: 'New policy update available', time: '1 day ago', read: true },
    { id: 3, message: 'Team meeting scheduled for tomorrow', time: '3 days ago', read: true }
  ];

  constructor() {}

  ngOnInit(): void {
    // In a real app, we would fetch data from a service
  }

  // Mock save function for profile
  onProfileSave(): void {
    console.log('Profile saved:', this.profile);
    alert('Profile saved successfully!');
  }

  // Mock save function for security
  onSecuritySave(): void {
    console.log('Security settings saved:', this.security);
    alert('Security settings saved successfully!');
  }

  // Mock save function for notifications
  onNotificationsSave(): void {
    console.log('Notification preferences saved:', this.notifications);
    alert('Notification preferences saved successfully!');
  }

  // Mock function to toggle MFA
  toggleMFA(): void {
    this.security.mfaEnabled = !this.security.mfaEnabled;
    console.log('MFA toggled to:', this.security.mfaEnabled);
  }

  // Helper methods for badges
  getRoleColor(role: string): string {
    switch (role) {
      case 'Admin': return 'danger';
      case 'Manager': return 'warning';
      case 'User': return 'info';
      default: return 'secondary';
    }
  }
}
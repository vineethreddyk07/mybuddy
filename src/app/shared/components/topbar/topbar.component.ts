import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  userName = 'John Doe';
  userRole = 'Admin';
  userInitials = 'JD';
  notifications = [
    { id: 1, message: 'New claim submitted', time: '5 min ago' },
    { id: 2, message: 'Team meeting scheduled', time: '1 hour ago' },
    { id: 3, message: 'Document uploaded', time: '2 hours ago' }
  ];
  showNotifications = false;
  showUserMenu = false;

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  logout(): void {
    console.log('Logout clicked');
  }

  goToProfile(): void {
    console.log('Profile clicked');
  }

  getUnreadCount(): number {
    return this.notifications.length;
  }
}

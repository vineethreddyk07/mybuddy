import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../../core/services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input() role: 'admin' | 'user' = 'admin';
  isLoggedIn = true;
  isSidebarCollapsed = false;
  private sub: Subscription = new Subscription();

  adminMenuItems = [
    { label: 'Dashboard', icon: 'bi bi-speedometer2', route: '/admin/dashboard' },
    { label: 'Users', icon: 'bi bi-people', route: '/admin/users' },
    { label: 'Teams', icon: 'bi bi-collection', route: '/admin/teams' },
    { label: 'Calendar', icon: 'bi bi-calendar4-week', route: '/admin/calendar' },
    { label: 'Payers', icon: 'bi bi-bank', route: '/admin/payers' },
    { label: 'Scenarios', icon: 'bi bi-list-task', route: '/admin/scenarios' },
    { label: 'Documents', icon: 'bi bi-folder', route: '/admin/documents' },
    { label: 'Analytics', icon: 'bi bi-graph-up', route: '/admin/analytics' },
    { label: 'Settings', icon: 'bi bi-gear', route: '/admin/settings' }
  ];

  userMenuItems = [
    { label: 'Dashboard', icon: 'bi bi-speedometer2', route: '/user/dashboard' },
    { label: 'Claims', icon: 'bi bi-file-earmark-text', route: '/user/claims' },
    { label: 'Documents', icon: 'bi bi-folder', route: '/user/documents' },
    { label: 'Profile', icon: 'bi bi-person', route: '/user/profile' }
  ];

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sub.add(
      this.sidebarService.collapsed$.subscribe((collapsed: boolean) => {
        this.isSidebarCollapsed = collapsed;
      })
    );
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  logout(): void {
    console.log('Logout clicked');
  }
}
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './shared/layouts/user-layout/user-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminLayoutComponent, UserLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isAdminLayout = false;
  isUserLayout = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        this.isAdminLayout = currentUrl.startsWith('/admin');
        this.isUserLayout = currentUrl.startsWith('/user');
      }
    });
  }
}

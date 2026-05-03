import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  role: string | null = null;

  constructor(private authService: AuthService) {
    this.role = this.authService.getRole();
  }

  logout(): void {
    this.authService.logout();
  }
}
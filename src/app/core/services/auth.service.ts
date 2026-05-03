import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS = {
    employee: { email: 'employee@mybuddy.com', password: '1234', role: 'employee' },
    admin: { email: 'admin@mybuddy.com', password: '1234', role: 'admin' }
  };

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const user = Object.values(this.USERS).find(
      u => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
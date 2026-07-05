import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // Mock login delay
      setTimeout(() => {
        const { email, password } = this.loginForm.value;
        // Mock credentials - in a real app, we would call an auth service
        if (email === 'admin@mybuddy.com' && password === 'admin123') {
          // Mock successful login
          // In a real app, we would store token/user info
          this.router.navigate(['/admin/dashboard']);
        } else if (email === 'user@mybuddy.com' && password === 'user123') {
          this.router.navigate(['/user/dashboard']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
        this.isLoading = false;
      }, 1000);
    }
  }
}
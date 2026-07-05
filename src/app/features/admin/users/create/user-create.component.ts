import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit {
  userForm: any;
  isLoading = false;
  activeTab = 'basic';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      // Basic Details
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      // Work Details
      team: ['', Validators.required],
      role: ['', Validators.required],
      department: [''],
      employeeId: [''],
      // Login Credentials
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      sendWelcomeEmail: [true]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator for password match
  passwordMatchValidator(g: any) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  get passwordMatchError() {
    return this.userForm.getError('mismatch') && this.userForm.get('confirmPassword')?.touched;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      // Mock form submission
      setTimeout(() => {
        // In a real app, we would call a service to create the user
        console.log('User created:', this.userForm.value);
        this.isLoading = false;
        this.userForm.reset();
        this.router.navigate(['/admin/users']);
      }, 1500);
    }
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  isTabActive(tab: string): boolean {
    return this.activeTab === tab;
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

  getStatusColor(status: string): string {
    return status === 'Active' ? 'success' : 'secondary';
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements OnInit {
  userForm: any;
  isLoading = false;
  activeTab = 'basic';
  userId: number | null = null;

  // Mock user data (in a real app, this would come from a service)
  private mockUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', team: 'Team A', role: 'Admin', department: 'IT', employeeId: 'E001', username: 'johndoe', password: 'dummy123', sendWelcomeEmail: true },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '098-765-4321', team: 'Team B', role: 'User', department: 'Marketing', employeeId: 'E002', username: 'janesmith', password: 'dummy456', sendWelcomeEmail: false }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get user ID from route
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.userId = id ? Number(id) : null;
      this.initForm();
      if (this.userId) {
        this.loadUserData();
      }
    });
  }

  initForm(): void {
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
      password: [''], // Not required for edit unless changing
      confirmPassword: [''],
      sendWelcomeEmail: [true]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  loadUserData(): void {
    // Mock loading user data
    const user = this.mockUsers.find(u => u.id === this.userId);
    if (user) {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        team: user.team,
        role: user.role,
        department: user.department,
        employeeId: user.employeeId,
        username: user.username,
        // We don't patch password for security reasons
        sendWelcomeEmail: user.sendWelcomeEmail
      });
    }
  }

  // Custom validator for password match
  passwordMatchValidator(g: any) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword || !password ? null : { mismatch: true };
  }

  get passwordMatchError() {
    return this.userForm.getError('mismatch') && this.userForm.get('confirmPassword')?.touched;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      // Mock form submission
      setTimeout(() => {
        // In a real app, we would call a service to update the user
        console.log('User updated:', this.userForm.value);
        this.isLoading = false;
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

  // Helper methods for badges (same as in user list)
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
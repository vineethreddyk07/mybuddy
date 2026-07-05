import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-payer-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './payer-create.component.html',
  styleUrl: './payer-create.component.scss'
})
export class PayerCreateComponent implements OnInit {
  payerForm: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.payerForm = this.fb.group({
      // Basic Details
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      type: ['', Validators.required],
      // Contact Information
      contactName: [''],
      contactEmail: ['', [Validators.email]],
      contactPhone: [''],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      // Settings
      isActive: [true],
      requiresAuthorization: [false]
    });
  }

  onSubmit(): void {
    if (this.payerForm.valid) {
      this.isLoading = true;
      // Mock form submission
      setTimeout(() => {
        // In a real app, we would call a service to create the payer
        console.log('Payer created:', this.payerForm.value);
        this.isLoading = false;
        this.payerForm.reset();
        this.router.navigate(['/admin/payers']);
      }, 1500);
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'Commercial': return 'primary';
      case 'Government': return 'success';
      case 'Blues': return 'info';
      default: return 'secondary';
    }
  }
}

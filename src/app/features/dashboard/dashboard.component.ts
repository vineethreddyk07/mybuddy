import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../../core/services/form.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  claimStatuses = ['Paid', 'Denied', 'Partial'];
  denialReasons = ['Missing Docs', 'Invalid Code'];
  payerOptions = ['Aetna', 'Medicare', 'Medicaid'];
  claimForm: any;

  get status(): string {
    return this.claimForm.get('status')?.value || '';
  }

  constructor(private fb: FormBuilder, private formService: FormService) {}

  ngOnInit(): void {
    this.claimForm = this.fb.group({
      patientName: ['', Validators.required],
      claimId: ['', Validators.required],
      payer: ['', Validators.required],
      callDate: ['', Validators.required],
      status: ['', Validators.required],
      paidAmount: [''],
      paymentDate: [''],
      paymentReference: [''],
      denialReason: [''],
      appealAllowed: [''],
      referenceNumber: [''],
      remainingAmount: [''],
      notes: ['']
    });
  }

  saveDraft(): void {
    const formData = this.claimForm.value;
    this.formService.saveForm(formData);
    alert('Draft saved successfully!');
  }

  submit(): void {
    if (this.claimForm.valid) {
      const formData = this.claimForm.value;
      this.formService.saveForm(formData);
      alert('Form submitted successfully!');
      this.claimForm.reset();
    }
  }

  copyReport(): void {
    const report = this.generateReport();
    navigator.clipboard.writeText(report);
    alert('Report copied to clipboard!');
  }

  generateReport(): string {
    const form = this.claimForm.value;
    let report = `Claim ID: ${form.claimId || ''}\n`;
    report += `Patient: ${form.patientName || ''}\n\n`;
    report += `Called payer ${form.payer || ''} on ${form.callDate || ''}\n\n`;
    report += `Status: ${form.status || ''}\n`;
    
    if (form.status === 'Paid') {
      report += `Paid Amount: ${form.paidAmount || ''}\n`;
      report += `Payment Date: ${form.paymentDate || ''}\n`;
      report += `Payment Reference: ${form.paymentReference || ''}\n`;
    } else if (form.status === 'Denied') {
      report += `Denial Reason: ${form.denialReason || ''}\n`;
      report += `Appeal Allowed: ${form.appealAllowed || ''}\n`;
      report += `Reference Number: ${form.referenceNumber || ''}\n`;
    } else if (form.status === 'Partial') {
      report += `Paid Amount: ${form.paidAmount || ''}\n`;
      report += `Remaining Amount: ${form.remainingAmount || ''}\n`;
    }
    
    if (form.notes) {
      report += `\nNotes: ${form.notes}\n`;
    }
    
    return report;
  }
}
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-create-claim',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './create-claim.component.html',
  styleUrl: './create-claim.component.scss'
})
export class CreateClaimComponent implements OnInit {
  claimForm: any;
  isLoading = false;

  // Mock data for dropdowns (in a real app, these would come from services)
  claimStatuses = ['Paid', 'Denied', 'Partial'];
  denialReasons = ['Missing Docs', 'Invalid Code', 'Not Covered', 'Duplicate'];
  payerOptions = ['Aetna', 'Medicare', 'Medicaid', 'UnitedHealthcare', 'Cigna'];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.claimForm = this.fb.group({
      // ✅ Pre-process
      patientName: ['', Validators.required],
      claimId: ['', Validators.required],
      payer: ['', Validators.required],
      callDate: ['', Validators.required],
      dos: [''],
      billedAmount: [''],
      previousHistory: [''],

      // ✅ On-process
      repName: [''],
      callRefNumber: [''],
      status: ['', Validators.required],

      // ✅ Paid
      receiveDate: [''],
      processDate: [''],
      paidAmount: [''],
      allowedAmount: [''],
      patientResponsibility: [''],
      paymentDate: [''],
      paymentReference: [''],

      // ✅ Denied
      denialReason: [''],
      appealAllowed: [''],
      referenceNumber: [''],

      // ✅ Partial
      remainingAmount: [''],

      // ✅ Notes
      notes: ['']
    });
  }

  onSubmit(): void {
    if (this.claimForm.valid) {
      this.isLoading = true;
      // Mock form submission
      setTimeout(() => {
        // In a real app, we would call a service to create the claim
        console.log('Claim created:', this.claimForm.value);
        this.isLoading = false;
        this.claimForm.reset();
        this.router.navigate(['/user/claims']);
      }, 1500);
    }
  }

  // Helper method to get instructions based on status
  getInstructions(): string[] {
    const status = this.claimForm.get('status')?.value;
    if (!status) return [];

    const today = new Date();
    const nrdDate = new Date();
    nrdDate.setDate(today.getDate() + 14);

    const formattedNRD = nrdDate.toLocaleDateString('en-US');

    if (status === 'Paid') {
      return [
        `A. Paste the notes and select "telephone followup-1".`,
        `B. Change the NRD to ${formattedNRD}`,
        `C. Check for the POR date; if not updated, update it with the claim receive date`,
        `D. Update the claim status into payment mailed`,
        `E. Check the EFT box if it's an EFT payment, otherwise leave it`,
        `F. Update the check number in the case page`,
        `G. If enforcer does not accept paid date, use today's date and mention it in notes`,
        `H. Save and cross-check all updated details`
      ];
    }

    if (status === 'Denied') {
      const today = new Date();
      const nrdDate = new Date();
      nrdDate.setDate(today.getDate() + 3);

      const formattedNRD = nrdDate.toLocaleDateString('en-US');

      return [
        `A. Change the POR date with the claim received date`,
        `B. Set the NRD to ${formattedNRD}`,
        `C. Update the claim status into denied zero pay`,
        `D. Paste the notes and select "telephone followup-1"`,
        `E. Upload the denied EOB into the document tab (select denial option while uploading)`
      ];
    }

    if (status === 'Partial') {
      return [
        `A. Paste notes and select partial payment workflow`,
        `B. Update paid and remaining amounts`,
        `C. Verify payment details`,
        `D. Save and cross-check`
      ];
    }

    return [];
  }
}
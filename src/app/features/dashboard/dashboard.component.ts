import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  claimForm!: FormGroup;

  get status(): string {
    return this.claimForm.get('status')?.value || '';
  }

  constructor(private fb: FormBuilder, private formService: FormService) { }

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

  getInstructions(): string[] {
    const status = this.status;

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
  saveDraft(): void {
    this.formService.saveForm(this.claimForm.value);
    alert('Draft saved successfully!');
  }

  submit(): void {
    if (this.claimForm.valid) {
      this.formService.saveForm(this.claimForm.value);
      alert('Form submitted successfully!');
      this.claimForm.reset();
    }
  }

  copyReport(): void {
    navigator.clipboard.writeText(this.generateReport());
    alert('Report copied!');
  }

  copyParagraph(): void {
    navigator.clipboard.writeText(this.generateParagraphReport());
    alert('Paragraph copied!');
  }

  // ✅ Structured Report
  generateReport(): string {
    const f = this.claimForm.value;

    let report = `Claim ID: ${f.claimId || ''}\n`;
    report += `Patient: ${f.patientName || ''}\n\n`;
    report += `Payer: ${f.payer || ''}\n`;
    report += `Call Date: ${f.callDate || ''}\n\n`;
    report += `Status: ${f.status || ''}\n`;

    if (f.status === 'Paid') {
      report += `Paid Amount: ${f.paidAmount}\n`;
      report += `Allowed: ${f.allowedAmount}\n`;
      report += `Patient Responsibility: ${f.patientResponsibility}\n`;
      report += `Payment Date: ${f.paymentDate}\n`;
      report += `Reference: ${f.paymentReference}\n`;
    }

    if (f.status === 'Denied') {
      report += `Reason: ${f.denialReason}\n`;
      report += `Appeal: ${f.appealAllowed}\n`;
    }

    if (f.status === 'Partial') {
      report += `Paid: ${f.paidAmount}\n`;
      report += `Remaining: ${f.remainingAmount}\n`;
    }

    if (f.notes) {
      report += `\nNotes: ${f.notes}`;
    }

    return report;
  }

  // ✅ Paragraph Report (MAIN FEATURE)
  generateParagraphReport(): string {
    const f = this.claimForm.value;

    if (!f.claimId) return '';

    let text = `As per the claim ${f.claimId}, patient ${f.patientName}, `;
    text += `the claim was processed with payer ${f.payer} on ${f.callDate}. `;

    if (f.status === 'Paid') {
      text += `The claim has been processed and paid. `;
      text += `An amount of $${f.paidAmount} was paid on ${f.paymentDate}. `;
      text += `Allowed amount is $${f.allowedAmount} and patient responsibility is $${f.patientResponsibility}. `;
      text += `Reference number is ${f.paymentReference}. `;
    }

    if (f.status === 'Denied') {
      text += `The claim was denied due to ${f.denialReason}. `;
      text += `Appeal allowed: ${f.appealAllowed}. `;
    }

    if (f.status === 'Partial') {
      text += `The claim is partially paid. `;
      text += `$${f.paidAmount} has been paid and $${f.remainingAmount} is pending. `;
    }

    if (f.notes) {
      text += `Additional notes: ${f.notes}.`;
    }

    return text;
  }
}
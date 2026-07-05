import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-report-preview',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './report-preview.component.html',
  styleUrl: './report-preview.component.scss'
})
export class ReportPreviewComponent implements OnInit {
  // Mock report data (in a real app, this would come from a service)
  report: any = null;
  claimId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get claim ID from route
    this.route.paramMap.subscribe(params => {
      this.claimId = params.get('id');
      if (this.claimId) {
        this.loadReport();
      }
    });
  }

  loadReport(): void {
    // Mock loading report data
    // In a real app, we would call a service to get the report
    const mockReports = [
      { 
        claimId: 'CLM-00123', 
        patientName: 'John Doe', 
        payer: 'Aetna', 
        date: '2026-05-30',
        structuredReport: `Claim ID: CLM-00123\nPatient: John Doe\n\nPayer: Aetna\nCall Date: 2026-05-30\n\nStatus: Pending\n\nNotes: Initial call made, awaiting documentation.`,
        paragraphReport: `As per the claim CLM-00123, patient John Doe, the claim was processed with payer Aetna on 2026-05-30. The claim is currently pending review. Initial call made, awaiting documentation.`
      },
      { 
        claimId: 'CLM-00122', 
        patientName: 'Jane Smith', 
        payer: 'Medicare', 
        date: '2026-05-29',
        structuredReport: `Claim ID: CLM-00122\nPatient: Jane Smith\n\nPayer: Medicare\nCall Date: 2026-05-29\n\nStatus: In Progress\n\nNotes: Waiting for additional information from provider.`,
        paragraphReport: `As per the claim CLM-00122, patient Jane Smith, the claim was processed with payer Medicare on 2026-05-29. The claim is currently in progress, waiting for additional information from provider.`
      },
      { 
        claimId: 'CLM-00121', 
        patientName: 'Bob Johnson', 
        payer: 'UnitedHealthcare', 
        date: '2026-05-28',
        structuredReport: `Claim ID: CLM-00121\nPatient: Bob Johnson\n\nPayer: UnitedHealthcare\nCall Date: 2026-05-28\n\nStatus: Completed\n\nPaid Amount: $3,200.00\nAllowed: $2,800.00\nPatient Responsibility: $400.00\nPayment Date: 2026-05-29\nReference: REF123456\n\nNotes: Claim processed and payment issued.`,
        paragraphReport: `As per the claim CLM-00121, patient Bob Johnson, the claim was processed with payer UnitedHealthcare on 2026-05-28. The claim has been processed and paid. An amount of $3,200.00 was paid on 2026-05-29. Allowed amount is $2,800.00 and patient responsibility is $400.00. Reference number is REF123456. Claim processed and payment issued.`
      }
    ];

    this.report = mockReports.find(r => r.claimId === this.claimId) || null;
  }

  // Mock functions
  copyReport(): void {
    if (this.report && this.report.structuredReport) {
      navigator.clipboard.writeText(this.report.structuredReport);
      alert('Report copied to clipboard!');
    }
  }

  downloadReport(): void {
    if (this.report && this.report.structuredReport) {
      const blob = new Blob([this.report.structuredReport], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `claim_${this.claimId}_report.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      alert('Report downloaded!');
    }
  }

  copyParagraph(): void {
    if (this.report && this.report.paragraphReport) {
      navigator.clipboard.writeText(this.report.paragraphReport);
      alert('Paragraph report copied to clipboard!');
    }
  }

  downloadParagraph(): void {
    if (this.report && this.report.paragraphReport) {
      const blob = new Blob([this.report.paragraphReport], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `claim_${this.claimId}_paragraph.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      alert('Paragraph report downloaded!');
    }
  }

  // Navigate back to claims list
  goBack(): void {
    this.router.navigate(['/user/claims']);
  }
}
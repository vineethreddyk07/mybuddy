import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-claim-details',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeaderComponent],
  templateUrl: './claim-details.component.html',
  styleUrl: './claim-details.component.scss'
})
export class ClaimDetailsComponent implements OnInit {
  // Mock claim data (in a real app, this would come from a service)
  claim: any = null;
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
        this.loadClaimDetails();
      }
    });
  }

  loadClaimDetails(): void {
    // Mock loading claim data
    // In a real app, we would call a service to get the claim details
    const mockClaims = [
      { id: 1, claimId: 'CLM-00123', patientName: 'John Doe', payer: 'Aetna', scenario: 'Standard Claim', status: 'Pending', date: '2026-05-30', amount: '$2,450.00', assignedTo: 'John Doe', notes: 'Initial call made, awaiting documentation.' },
      { id: 2, claimId: 'CLM-00122', patientName: 'Jane Smith', payer: 'Medicare', scenario: 'Dental Claim', status: 'In Progress', date: '2026-05-29', amount: '$1,200.00', assignedTo: 'Jane Smith', notes: 'Waiting for additional information from provider.' },
      { id: 3, claimId: 'CLM-00121', patientName: 'Bob Johnson', payer: 'UnitedHealthcare', scenario: 'Workers Comp', status: 'Completed', date: '2026-05-28', amount: '$3,200.00', assignedTo: 'Bob Johnson', notes: 'Claim processed and payment issued.' }
    ];

    this.claim = mockClaims.find(c => c.claimId === this.claimId) || null;
  }

  // Helper methods for badges
  getStatusColor(status: string): string {
    switch (status) {
      case 'Pending': return 'warning';
      case 'In Progress': return 'info';
      case 'Completed': return 'success';
      case 'Denied': return 'danger';
      case 'Partial': return 'secondary';
      default: return 'light';
    }
  }

  // Navigate back to claims list
  goBack(): void {
    this.router.navigate(['/user/claims']);
  }
}
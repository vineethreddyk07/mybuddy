import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './claim-list.component.html',
  styleUrl: './claim-list.component.scss'
})
export class ClaimListComponent implements OnInit {
  // Mock data for claims
  claims = [
    { id: 1, claimId: 'CLM-00123', patientName: 'John Doe', payer: 'Aetna', scenario: 'Standard Claim', status: 'Pending', date: '2026-05-30', amount: '$2,450.00', assignedTo: 'John Doe' },
    { id: 2, claimId: 'CLM-00122', patientName: 'Jane Smith', payer: 'Medicare', scenario: 'Dental Claim', status: 'In Progress', date: '2026-05-29', amount: '$1,200.00', assignedTo: 'Jane Smith' },
    { id: 3, claimId: 'CLM-00121', patientName: 'Bob Johnson', payer: 'UnitedHealthcare', scenario: 'Workers Comp', status: 'Completed', date: '2026-05-28', amount: '$3,200.00', assignedTo: 'Bob Johnson' },
    { id: 4, claimId: 'CLM-00120', patientName: 'Alice Brown', payer: 'Cigna', scenario: 'Standard Claim', status: 'Pending', date: '2026-05-27', amount: '$1,800.00', assignedTo: 'Alice Brown' },
    { id: 5, claimId: 'CLM-00119', patientName: 'Charlie Wilson', payer: 'Aetna', scenario: 'Dental Claim', status: 'In Progress', date: '2026-05-26', amount: '$2,100.00', assignedTo: 'Charlie Wilson' },
    { id: 6, claimId: 'CLM-00118', patientName: 'David Lee', payer: 'Medicaid', scenario: 'Standard Claim', status: 'Denied', date: '2026-05-25', amount: '$0.00', assignedTo: 'David Lee' },
    { id: 7, claimId: 'CLM-00117', patientName: 'Sarah Davis', payer: 'UnitedHealthcare', scenario: 'Workers Comp', status: 'Partial', date: '2026-05-24', amount: '$1,500.00', assignedTo: 'Sarah Davis' }
  ];

  // For search and filter (mock)
  searchTerm = '';
  selectedStatus = '';
  selectedPayer = '';
  selectedScenario = '';
  dateRangeStart = '';
  dateRangeEnd = '';

  statuses = ['Pending', 'In Progress', 'Completed', 'Denied', 'Partial'];
  payers = ['Aetna', 'Medicare', 'Medicaid', 'UnitedHealthcare', 'Cigna'];
  scenarios = ['Standard Claim', 'Dental Claim', 'Vision Claim', 'Workers Comp', 'Motor Vehicle Accident'];

  // Pagination mock
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = this.claims.length;

  // Get paginated claims
  get paginatedClaims() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.claims.slice(startIndex, endIndex);
  }

  // Get total pages
  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  constructor() {}

  ngOnInit(): void {
    // In a real app, we would fetch data from a service
  }

  // Mock functions for search and filter
  onSearch(): void {
    console.log('Search:', this.searchTerm);
  }

  onFilter(): void {
    console.log('Filter:', { status: this.selectedStatus, payer: this.selectedPayer, scenario: this.selectedScenario, dateRange: { start: this.dateRangeStart, end: this.dateRangeEnd } });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
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

  // Helper for pagination
  paginate(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  trackByIndex(index: number): number {
    return index;
  }

  // Mock delete function
  deleteClaim(id: number): void {
    // In a real app, we would call a service to delete the claim
    console.log('Delete claim with id:', id);
    // For demo, we'll just filter out the claim (not actually removing from the array since it's mock)
    // But we won't implement the actual removal to keep it simple
    alert('Claim deletion is not implemented in this mockup.');
  }
}
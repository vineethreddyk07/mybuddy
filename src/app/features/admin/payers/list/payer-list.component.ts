import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-payer-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './payer-list.component.html',
  styleUrl: './payer-list.component.scss'
})
export class PayerListComponent implements OnInit {
  // Mock data for payers
  payers = [
    { id: 1, name: 'Aetna', code: 'AET', type: 'Commercial', status: 'Active', assignedScenarios: 5 },
    { id: 2, name: 'Medicare', code: 'MCR', type: 'Government', status: 'Active', assignedScenarios: 3 },
    { id: 3, name: 'Medicaid', code: 'MCD', type: 'Government', status: 'Active', assignedScenarios: 4 },
    { id: 4, name: 'UnitedHealthcare', code: 'UHC', type: 'Commercial', status: 'Active', assignedScenarios: 2 },
    { id: 5, name: 'Cigna', code: 'CIG', type: 'Commercial', status: 'Active', assignedScenarios: 1 }
  ];

  // For search and filter (mock)
  searchTerm = '';
  selectedType = '';
  selectedStatus = '';

  types = ['Commercial', 'Government', 'Blues'];
  statuses = ['Active', 'Inactive', 'Pending'];

  // Pagination mock
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = this.payers.length;

  // Get paginated payers
  get paginatedPayers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.payers.slice(startIndex, endIndex);
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
    console.log('Filter:', { type: this.selectedType, status: this.selectedStatus });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  // Helper methods for badges
  getTypeColor(type: string): string {
    switch (type) {
      case 'Commercial': return 'primary';
      case 'Government': return 'success';
      case 'Blues': return 'info';
      default: return 'secondary';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'secondary';
      case 'Pending': return 'warning';
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
  deletePayer(id: number): void {
    // In a real app, we would call a service to delete the payer
    console.log('Delete payer with id:', id);
    // For demo, we'll just filter out the payer (not actually removing from the array since it's mock)
    // But we won't implement the actual removal to keep it simple
    alert('Payer deletion is not implemented in this mockup.');
  }
}
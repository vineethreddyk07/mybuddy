import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-scenario-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './scenario-list.component.html',
  styleUrl: './scenario-list.component.scss'
})
export class ScenarioListComponent implements OnInit {
  // Mock data for scenarios
  scenarios = [
    { id: 1, name: 'Standard Claim', code: 'STD', type: 'Medical', status: 'Active', assignedPayers: 3 },
    { id: 2, name: 'Dental Claim', code: 'DENT', type: 'Dental', status: 'Active', assignedPayers: 2 },
    { id: 3, name: 'Vision Claim', code: 'VIS', type: 'Vision', status: 'Active', assignedPayers: 1 },
    { id: 4, name: 'Workers Comp', code: 'WC', type: 'Workers Comp', status: 'Active', assignedPayers: 2 },
    { id: 5, name: 'Motor Vehicle Accident', code: 'MVA', type: 'Liability', status: 'Active', assignedPayers: 1 }
  ];

  // For search and filter (mock)
  searchTerm = '';
  selectedType = '';
  selectedStatus = '';

  types = ['Medical', 'Dental', 'Vision', 'Workers Comp', 'Liability'];
  statuses = ['Active', 'Inactive', 'Draft'];

  // Pagination mock
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = this.scenarios.length;

  // Get paginated scenarios
  get paginatedScenarios() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.scenarios.slice(startIndex, endIndex);
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
      case 'Medical': return 'primary';
      case 'Dental': return 'success';
      case 'Vision': return 'info';
      case 'Workers Comp': return 'warning';
      case 'Liability': return 'danger';
      default: return 'secondary';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'secondary';
      case 'Draft': return 'warning';
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
  deleteScenario(id: number): void {
    // In a real app, we would call a service to delete the scenario
    console.log('Delete scenario with id:', id);
    // For demo, we'll just filter out the scenario (not actually removing from the array since it's mock)
    // But we won't implement the actual removal to keep it simple
    alert('Scenario deletion is not implemented in this mockup.');
  }
}
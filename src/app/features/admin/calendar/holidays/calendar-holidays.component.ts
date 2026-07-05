import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-calendar-holidays',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './calendar-holidays.component.html',
  styleUrl: './calendar-holidays.component.scss'
})
export class CalendarHolidaysComponent implements OnInit {
  // Mock data for holidays
  holidays = [
    { id: 1, name: 'New Year\'s Day', date: '2026-01-01', type: 'Public' },
    { id: 2, name: 'Martin Luther King Jr. Day', date: '2026-01-19', type: 'Public' },
    { id: 3, name: 'Presidents\' Day', date: '2026-02-16', type: 'Public' },
    { id: 4, name: 'Memorial Day', date: '2026-05-25', type: 'Public' },
    { id: 5, name: 'Juneteenth', date: '2026-06-19', type: 'Public' },
    { id: 6, name: 'Independence Day', date: '2026-07-04', type: 'Public' },
    { id: 7, name: 'Labor Day', date: '2026-09-07', type: 'Public' },
    { id: 8, name: 'Columbus Day', date: '2026-10-12', type: 'Public' },
    { id: 9, name: 'Veterans Day', date: '2026-11-11', type: 'Public' },
    { id: 10, name: 'Thanksgiving Day', date: '2026-11-26', type: 'Public' },
    { id: 11, name: 'Christmas Day', date: '2026-12-25', type: 'Public' }
  ];

  // For search and filter (mock)
  searchTerm = '';
  selectedType = '';

  types = ['Public', 'Company', 'Religious'];

  // Pagination mock
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = this.holidays.length;

  // Get paginated holidays
  get paginatedHolidays() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.holidays.slice(startIndex, endIndex);
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
    console.log('Filter:', { type: this.selectedType });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  // Helper methods for badges
  getTypeColor(type: string): string {
    switch (type) {
      case 'Public': return 'primary';
      case 'Company': return 'secondary';
      case 'Religious': return 'info';
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
  deleteHoliday(id: number): void {
    // In a real app, we would call a service to delete the holiday
    console.log('Delete holiday with id:', id);
    // For demo, we'll just filter out the holiday (not actually removing from the array since it's mock)
    // But we won't implement the actual removal to keep it simple
    alert('Holiday deletion is not implemented in this mockup.');
  }

  // Mock create function (navigate to create page)
  createHoliday(): void {
    // In a real app, this would navigate to a create/edit page
    console.log('Create new holiday');
  }
}
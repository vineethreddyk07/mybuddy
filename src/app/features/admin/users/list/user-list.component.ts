import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  // Mock data for users
  users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', team: 'Team A', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', team: 'Team B', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', team: 'Team A', role: 'User', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', team: 'Team C', role: 'Manager', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', team: 'Team B', role: 'User', status: 'Inactive' },
    { id: 6, name: 'Diana Lee', email: 'diana.lee@example.com', team: 'Team A', role: 'Admin', status: 'Active' },
    { id: 7, name: 'Evan Davis', email: 'evan.davis@example.com', team: 'Team C', role: 'User', status: 'Active' },
    { id: 8, name: 'Fiona Clark', email: 'fiona.clark@example.com', team: 'Team B', role: 'User', status: 'Active' }
  ];

  // For search and filter (mock)
  searchTerm = '';
  selectedTeam = '';
  selectedRole = '';
  selectedStatus = '';

  teams = ['Team A', 'Team B', 'Team C'];
  roles = ['Admin', 'Manager', 'User'];
  statuses = ['Active', 'Inactive'];

  // Pagination mock
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = this.users.length;

  // Get paginated users
  get paginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
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
    // In a real app, we would filter the users based on search term
    console.log('Search:', this.searchTerm);
  }

  onFilter(): void {
    // In a real app, we would filter the users based on selected filters
    console.log('Filter:', { team: this.selectedTeam, role: this.selectedRole, status: this.selectedStatus });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  // Helper methods for badges
  getRoleColor(role: string): string {
    switch (role) {
      case 'Admin': return 'danger';
      case 'Manager': return 'warning';
      case 'User': return 'info';
      default: return 'secondary';
    }
  }

  getStatusColor(status: string): string {
    return status === 'Active' ? 'success' : 'secondary';
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
  deleteUser(id: number): void {
    // In a real app, we would call a service to delete the user
    console.log('Delete user with id:', id);
    // For demo, we'll just filter out the user (not actually removing from the array since it's mock)
    // But we won't implement the actual removal to keep it simple
    alert('User deletion is not implemented in this mockup.');
  }
}
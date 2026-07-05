import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.scss'
})
export class TeamListComponent implements OnInit {
  // Mock data for teams
  teams = [
    { id: 1, name: 'Team A', members: 5, target: 100, completed: 75, status: 'Active' },
    { id: 2, name: 'Team B', members: 8, target: 150, completed: 120, status: 'Active' },
    { id: 3, name: 'Team C', members: 3, target: 50, completed: 30, status: 'Active' },
    { id: 4, name: 'Team D', members: 6, target: 80, completed: 60, status: 'Active' },
    { id: 5, name: 'Team E', members: 4, target: 60, completed: 45, status: 'Active' }
  ];

  // For search and filter (mock)
  searchTerm = '';
  selectedStatus = '';

  statuses = ['Active', 'Inactive'];

  // Pagination mock
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = this.teams.length;

  // Get paginated teams
  get paginatedTeams() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.teams.slice(startIndex, endIndex);
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
    console.log('Filter:', { status: this.selectedStatus });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  // Helper methods for badges
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

  roundProgress(value: number): number {
    return Math.round(value);
  }

  // Mock delete function
  deleteTeam(id: number): void {
    // In a real app, we would call a service to delete the team
    console.log('Delete team with id:', id);
    // For demo, we'll just filter out the team (not actually removing from the array since it's mock)
    // But we won't implement the actual removal to keep it simple
    alert('Team deletion is not implemented in this mockup.');
  }
}
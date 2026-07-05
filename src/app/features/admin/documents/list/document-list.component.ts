import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent implements OnInit {
  // Mock data for documents
  documents = [
    { id: 1, name: 'Claim Form Template.pdf', type: 'PDF', size: '245 KB', uploadedBy: 'Admin', uploadedDate: '2026-05-01', category: 'Templates' },
    { id: 2, name: 'Invoice Sample.xlsx', type: 'Excel', size: '1.2 MB', uploadedBy: 'John Doe', uploadedDate: '2026-05-05', category: 'Samples' },
    { id: 3, name: 'Procedure Guide.docx', type: 'Word', size: '850 KB', uploadedBy: 'Jane Smith', uploadedDate: '2026-05-10', category: 'Guides' },
    { id: 4, name: 'Policy Update.pdf', type: 'PDF', size: '3.1 MB', uploadedBy: 'Admin', uploadedDate: '2026-05-15', category: 'Policies' },
    { id: 5, name: 'Training Video.mp4', type: 'Video', size: '45.2 MB', uploadedBy: 'Bob Johnson', uploadedDate: '2026-05-20', category: 'Training' }
  ];

  // For search and filter (mock)
  searchTerm = '';
  selectedCategory = '';
  selectedType = '';

  categories = ['Templates', 'Samples', 'Guides', 'Policies', 'Training', 'Other'];
  types = ['PDF', 'Word', 'Excel', 'PowerPoint', 'Image', 'Video', 'Other'];

  // Pagination mock
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = this.documents.length;

  // Get paginated documents
  get paginatedDocuments() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.documents.slice(startIndex, endIndex);
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
    console.log('Filter:', { category: this.selectedCategory, type: this.selectedType });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  // Helper methods for badges
  getCategoryColor(category: string): string {
    switch (category) {
      case 'Templates': return 'primary';
      case 'Samples': return 'success';
      case 'Guides': return 'info';
      case 'Policies': return 'warning';
      case 'Training': return 'danger';
      case 'Other': return 'secondary';
      default: return 'light';
    }
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'PDF': return 'danger';
      case 'Word': return 'primary';
      case 'Excel': return 'success';
      case 'PowerPoint': return 'info';
      case 'Image': return 'warning';
      case 'Video': return 'secondary';
      case 'Other': return 'light';
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
  deleteDocument(id: number): void {
    // In a real app, we would call a service to delete the document
    console.log('Delete document with id:', id);
    // For demo, we'll just filter out the document (not actually removing from the array since it's mock)
    // But we won't implement the actual removal to keep it simple
    alert('Document deletion is not implemented in this mockup.');
  }
}
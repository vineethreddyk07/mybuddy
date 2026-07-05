import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './document-upload.component.html',
  styleUrl: './document-upload.component.scss'
})
export class DocumentUploadComponent implements OnInit {
  // Form data
  documentForm = {
    name: '',
    type: '',
    category: '',
    description: '',
    file: null as File | null
  };

  // Options
  categories = ['Templates', 'Samples', 'Guides', 'Policies', 'Training', 'Other'];
  types = ['PDF', 'Word', 'Excel', 'PowerPoint', 'Image', 'Video', 'Other'];

  // Upload state
  isUploading = false;
  uploadProgress = 0;
  uploadSuccess = false;
  uploadError = '';

  constructor() {}

  ngOnInit(): void {
    // In a real app, we would fetch data from a service
  }

  // File selection handler
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.documentForm.file = file;
      // Auto-populate name and type based on file
      this.documentForm.name = file.name;
      this.documentForm.type = this.getFileType(file.name);
    }
  }

  // Get file type from filename
  getFileType(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    switch (extension) {
      case 'pdf': return 'PDF';
      case 'doc':
      case 'docx': return 'Word';
      case 'xls':
      case 'xlsx': return 'Excel';
      case 'ppt':
      case 'pptx': return 'PowerPoint';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'Image';
      case 'mp4':
      case 'avi':
      case 'mov': return 'Video';
      default: return 'Other';
    }
  }

  // Mock upload function
  onUpload(): void {
    if (!this.documentForm.file) {
      this.uploadError = 'Please select a file to upload';
      return;
    }

    if (!this.documentForm.name || !this.documentForm.type || !this.documentForm.category) {
      this.uploadError = 'Please fill in all required fields';
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;
    this.uploadError = '';
    this.uploadSuccess = false;

    // Simulate upload progress
    const interval = setInterval(() => {
      this.uploadProgress += Math.floor(Math.random() * 10) + 5;
      if (this.uploadProgress >= 100) {
        this.uploadProgress = 100;
        clearInterval(interval);
        this.uploadSuccess = true;
        this.isUploading = false;
        // In a real app, we would reset the form and show success message
        setTimeout(() => {
          this.uploadSuccess = false;
        }, 3000);
      }
    }, 300);
  }

  // Helper methods for badges and icons
  getTypeColor(type: string): string {
    switch (type) {
      case 'PDF': return 'danger';
      case 'Word': return 'primary';
      case 'Excel': return 'success';
      case 'PowerPoint': return 'info';
      case 'Image': return 'warning';
      case 'Video': return 'secondary';
      default: return 'light';
    }
  }

  getCategoryColor(category: string): string {
    switch (category) {
      case 'Templates': return 'primary';
      case 'Samples': return 'success';
      case 'Guides': return 'info';
      case 'Policies': return 'warning';
      case 'Training': return 'danger';
      default: return 'secondary';
    }
  }

  getDocumentIcon(type: string): string {
    switch (type) {
      case 'PDF': return 'bi-file-earmark-pdf';
      case 'Word': return 'bi-file-earmark-word';
      case 'Excel': return 'bi-file-earmark-excel';
      case 'PowerPoint': return 'bi-file-earmark-ppt';
      case 'Image': return 'bi-file-earmark-image';
      case 'Video': return 'bi-file-earmark-play';
      default: return 'bi-file-earmark';
    }
  }

  // Cancel upload
  cancelUpload(): void {
    this.isUploading = false;
    this.uploadProgress = 0;
    this.uploadError = '';
    this.uploadSuccess = false;
    this.documentForm = {
      name: '',
      type: '',
      category: '',
      description: '',
      file: null
    };
  }
}
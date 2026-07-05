import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  // Form data
  settingsForm = {
    // General Settings
    companyName: '',
    timezone: '',
    dateFormat: '',
    timeFormat: '',
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationFrequency: 'immediate',
    // Security Settings
    passwordExpirationDays: 90,
    maxLoginAttempts: 5,
    sessionTimeoutMinutes: 30,
    requireMFA: false,
    // System Settings
    backupFrequency: 'weekly',
    maxFileSizeMB: 25,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png'],
    enableAuditLog: true
  };

  // Options
  timezones = [
    'UTC',
    'EST',
    'PST',
    'CST',
    'MST',
    'GMT',
    'CET',
    'IST',
    'JST',
    'AEST'
  ];
  dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'];
  timeFormats = ['12-hour', '24-hour'];
  notificationFrequencies = ['immediate', 'hourly', 'daily', 'weekly'];
  backupFrequencies = ['daily', 'weekly', 'monthly'];

  constructor() {}

  ngOnInit(): void {
    // In a real app, we would fetch data from a service
    // For now, we'll set some default values
    this.settingsForm = {
      ...this.settingsForm,
      companyName: 'MyBuddy Healthcare Solutions',
      timezone: 'EST',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour'
    };
  }

  // Mock save function
  onSave(): void {
    // In a real app, we would call a service to save the settings
    console.log('Settings saved:', this.settingsForm);
    alert('Settings saved successfully!');
  }

  // Mock reset function
  onReset(): void {
    // In a real app, we would reset to default values
    console.log('Settings reset to defaults');
    // Reset form to initial state
    this.settingsForm = {
      companyName: '',
      timezone: '',
      dateFormat: '',
      timeFormat: '',
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      notificationFrequency: 'immediate',
      passwordExpirationDays: 90,
      maxLoginAttempts: 5,
      sessionTimeoutMinutes: 30,
      requireMFA: false,
      backupFrequency: 'weekly',
      maxFileSizeMB: 25,
      allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png'],
      enableAuditLog: true
    };
  }

  // Helper for file types display
  getFileTypesDisplay(): string {
    return this.settingsForm.allowedFileTypes.join(', ').toUpperCase();
  }
}
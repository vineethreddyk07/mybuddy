import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-calendar-workdays',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './calendar-workdays.component.html',
  styleUrl: './calendar-workdays.component.scss'
})
export class CalendarWorkdaysComponent implements OnInit {
  // Mock data for workday configuration
  workdayConfig = {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
    holidaysAreWorkdays: false,
    weekendDaysAreWorkdays: false
  };

  // Mock data for custom workdays
  customWorkdays = [
    { id: 1, date: '2026-01-01', isWorkday: false, description: 'New Year\'s Day' },
    { id: 2, date: '2026-07-04', isWorkday: false, description: 'Independence Day' },
    { id: 3, date: '2026-12-25', isWorkday: false, description: 'Christmas Day' }
  ];

  constructor() {}

  ngOnInit(): void {
    // In a real app, we would fetch data from a service
  }

  // Mock functions
  toggleWorkday(day: string): void {
    // In a real app, we would update the configuration
    console.log(`Toggle ${day} workday:`, !this.workdayConfig[day as keyof typeof this.workdayConfig]);
  }

  toggleHolidaysAsWorkdays(): void {
    // In a real app, we would update the configuration
    console.log('Toggle holidays as workdays:', !this.workdayConfig.holidaysAreWorkdays);
  }

  toggleWeekendDaysAsWorkdays(): void {
    // In a real app, we would update the configuration
    console.log('Toggle weekend days as workdays:', !this.workdayConfig.weekendDaysAreWorkdays);
  }

  addCustomWorkday(): void {
    // In a real app, we would open a dialog to add a custom workday
    console.log('Add custom workday');
  }

  deleteCustomWorkday(id: number): void {
    // In a real app, we would delete the custom workday
    console.log('Delete custom workday with id:', id);
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ScenarioField {
  fieldName: string;
  type: string;
  options: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  fields: ScenarioField[] = [
    { fieldName: 'status', type: 'dropdown', options: 'Paid, Denied, Partial' },
    { fieldName: 'payer', type: 'dropdown', options: 'Aetna, Medicare, Medicaid' },
    { fieldName: 'patientName', type: 'text', options: '' },
    { fieldName: 'claimId', type: 'text', options: '' }
  ];

  addField(): void {
    const newField: ScenarioField = {
      fieldName: 'newField',
      type: 'text',
      options: ''
    };
    this.fields.push(newField);
  }
}
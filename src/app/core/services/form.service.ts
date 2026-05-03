import { Injectable } from '@angular/core';

export interface SavedForm {
  id: string;
  claimId: string;
  patientName: string;
  payer: string;
  callDate: string;
  status: string;
  paidAmount?: number;
  paymentDate?: string;
  paymentReference?: string;
  denialReason?: string;
  appealAllowed?: string;
  referenceNumber?: string;
  remainingAmount?: number;
  notes: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly STORAGE_KEY = 'savedForms';

  constructor() { }

  saveForm(formData: any): void {
    const forms = this.getSavedForms();
    const newForm: SavedForm = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    forms.push(newForm);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(forms));
  }

  getSavedForms(): SavedForm[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getFormById(id: string): SavedForm | undefined {
    return this.getSavedForms().find(f => f.id === id);
  }
}
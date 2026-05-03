import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormService, SavedForm } from '../../core/services/form.service';

@Component({
  selector: 'app-saved-forms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-forms.component.html',
  styleUrl: './saved-forms.component.scss'
})
export class SavedFormsComponent {
  savedForms: SavedForm[] = [];
  selectedForm: SavedForm | null = null;

  constructor(private formService: FormService) {
    this.savedForms = this.formService.getSavedForms();
    if (this.savedForms.length > 0) {
      this.selectedForm = this.savedForms[0];
    }
  }
}
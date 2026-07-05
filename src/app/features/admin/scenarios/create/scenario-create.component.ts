import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-scenario-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, PageHeaderComponent],
  templateUrl: './scenario-create.component.html',
  styleUrl: './scenario-create.component.scss'
})
export class ScenarioCreateComponent implements OnInit {
  scenarioForm: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.scenarioForm = this.fb.group({
      // Basic Information
      name: ['', Validators.required],
      code: ['', [Validators.required, Validators.maxLength(10)]],
      type: ['', Validators.required],
      description: [''],
      // Sections (we'll just have a placeholder for now)
      sectionCount: ['', [Validators.required, Validators.min(1)]],
      // Settings
      isActive: [true],
      isDefault: [false]
    });
  }

  onSubmit(): void {
    if (this.scenarioForm.valid) {
      this.isLoading = true;
      // Mock form submission
      setTimeout(() => {
        // In a real app, we would call a service to create the scenario
        console.log('Scenario created:', this.scenarioForm.value);
        this.isLoading = false;
        this.scenarioForm.reset();
        this.router.navigate(['/admin/scenarios']);
      }, 1500);
    }
  }
}
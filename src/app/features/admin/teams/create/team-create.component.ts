import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-team-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent],
  templateUrl: './team-create.component.html',
  styleUrl: './team-create.component.scss'
})
export class TeamCreateComponent implements OnInit {
  teamForm: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      // Team Details
      name: ['', Validators.required],
      description: [''],
      // Targets
      monthlyTarget: ['', [Validators.required, Validators.min(0)]],
      quarterlyTarget: ['', [Validators.required, Validators.min(0)]],
      // Members (we'll just have a placeholder for now)
      memberCount: ['', [Validators.required, Validators.min(1)]],
      // Settings
      isActive: [true]
    });
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      this.isLoading = true;
      // Mock form submission
      setTimeout(() => {
        // In a real app, we would call a service to create the team
        console.log('Team created:', this.teamForm.value);
        this.isLoading = false;
        this.teamForm.reset();
        this.router.navigate(['/admin/teams']);
      }, 1500);
    }
  }
}
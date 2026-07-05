import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';

// Admin routes
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component';
import { UserListComponent } from './features/admin/users/list/user-list.component';
import { UserCreateComponent } from './features/admin/users/create/user-create.component';
import { UserEditComponent } from './features/admin/users/edit/user-edit.component';
import { TeamListComponent } from './features/admin/teams/list/team-list.component';
import { TeamCreateComponent } from './features/admin/teams/create/team-create.component';
import { CalendarHolidaysComponent } from './features/admin/calendar/holidays/calendar-holidays.component';
import { CalendarWorkdaysComponent } from './features/admin/calendar/workdays/calendar-workdays.component';
import { PayerListComponent } from './features/admin/payers/list/payer-list.component';
import { PayerCreateComponent } from './features/admin/payers/create/payer-create.component';
import { ScenarioListComponent } from './features/admin/scenarios/list/scenario-list.component';
import { ScenarioCreateComponent } from './features/admin/scenarios/create/scenario-create.component';
import { DocumentListComponent } from './features/admin/documents/list/document-list.component';
import { DocumentUploadComponent } from './features/admin/documents/upload/document-upload.component';
import { AnalyticsComponent } from './features/admin/analytics/analytics.component';
import { SettingsComponent } from './features/admin/settings/settings.component';

// User routes
import { UserDashboardComponent } from './features/user/dashboard/user-dashboard.component';
import { ClaimListComponent } from './features/user/claims/claim-list/claim-list.component';
import { CreateClaimComponent } from './features/user/claims/create-claim/create-claim.component';
import { ClaimDetailsComponent } from './features/user/claims/claim-details/claim-details.component';
import { ReportPreviewComponent } from './features/user/claims/report-preview/report-preview.component';
import { UserDocumentListComponent } from './features/user/documents/list/user-document-list.component';
import { UserProfileComponent } from './features/user/profile/user-profile.component';

import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  // Admin
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/create', component: UserCreateComponent },
      { path: 'users/edit/:id', component: UserEditComponent },
      { path: 'teams', component: TeamListComponent },
      { path: 'teams/create', component: TeamCreateComponent },
      { path: 'calendar/holidays', component: CalendarHolidaysComponent },
      { path: 'calendar/workdays', component: CalendarWorkdaysComponent },
      { path: 'payers', component: PayerListComponent },
      { path: 'payers/create', component: PayerCreateComponent },
      { path: 'scenarios', component: ScenarioListComponent },
      { path: 'scenarios/create', component: ScenarioCreateComponent },
      { path: 'documents', component: DocumentListComponent },
      { path: 'documents/upload', component: DocumentUploadComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // User
  {
    path: 'user',
    children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'claims', component: ClaimListComponent },
      { path: 'claims/create', component: CreateClaimComponent },
      { path: 'claims/:id', component: ClaimDetailsComponent },
      { path: 'report-preview/:id', component: ReportPreviewComponent },
      { path: 'documents', component: UserDocumentListComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Otherwise redirect to 404
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
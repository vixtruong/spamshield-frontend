import { Routes } from '@angular/router';
import { ClassifyComponent } from './classify/classify.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmailDetailComponent } from './email-detail/email-detail.component';

export const routes: Routes = [
  { path: 'classify', component: ClassifyComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'email-detail/:id', component: EmailDetailComponent },
  { path: '', redirectTo: '/classify', pathMatch: 'full' }
];
import { Routes } from '@angular/router';
import { ClassifyComponent } from './classify/classify.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'classify', component: ClassifyComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/classify', pathMatch: 'full' }
];
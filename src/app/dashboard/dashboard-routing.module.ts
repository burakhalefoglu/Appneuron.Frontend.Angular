import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ProjectManagementComponent } from './project-managment/project-management.component';

const routes: Routes = [
  {
    path: 'project-managment',
    component: ProjectManagementComponent,
    //  canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'project-managment', pathMatch: 'full' },
  {
    path: 'project-details',
    loadChildren: () =>
      import('./project-detail-dashboard/project-detail-dashboard.module').then(
        (m) => m.ProjectDetailDashboardModule
      ),
    //  canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

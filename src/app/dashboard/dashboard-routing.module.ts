import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectManagementComponent } from './project-managment/project-management.component';
import {ProjectDetailDashboardComponent} from '@app/dashboard/project-detail-dashboard/project-detail-dashboard.component';

const routes: Routes = [
  {
    path: 'project-managment',
    component: ProjectManagementComponent,
    //  canActivate: [AuthGuard],
  },
  {
    path: 'project-details',
      component: ProjectDetailDashboardComponent,
      //  canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

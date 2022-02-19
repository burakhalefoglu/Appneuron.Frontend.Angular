import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { ProjectDetailDashboardComponent } from './project-detail-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectDetailDashboardComponent,
    //  canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailDashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailDashboardComponent } from './project-detail-dashboard.component';
import { ProjectDetailDashboardRoutingModule } from './project-detail-dashboard-routing.module';



@NgModule({
  declarations: [ProjectDetailDashboardComponent],
  imports: [
    CommonModule,
    ProjectDetailDashboardRoutingModule
  ]
})
export class ProjectDetailDashboardModule { }

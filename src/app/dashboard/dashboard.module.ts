import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProjectManagementComponent } from './project-managment/project-management.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ProjectManagementComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
        FormsModule
    ]
})
export class DashboardModule { }

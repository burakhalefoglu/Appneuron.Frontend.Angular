import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ProjectManagementComponent} from './project-managment/project-management.component';
import {NgbDatepickerModule, NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DashboardService} from '@app/dashboard/services/dashboard.service';
import {AuthService} from '@app/auth/services/auth.service';
import {TimerModule} from '@core/components/timer/timer.module';
import {DatepickerModule} from '@core/components/datepicker/datepicker.module';
import {ProjectDetailDashboardComponent} from '@app/dashboard/project-detail-dashboard/project-detail-dashboard.component';
import {HeaderComponent} from '@app/dashboard/project-detail-dashboard/header/header.component';
import {TopbarComponent} from '@app/dashboard/project-detail-dashboard/topbar/topbar.component';


@NgModule({
    providers: [
        DashboardService,
        AuthService
    ],
    declarations: [
        ProjectManagementComponent,
        ProjectDetailDashboardComponent,
        HeaderComponent,
        TopbarComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        TimerModule,
        NgbDropdownModule,
        NgbDatepickerModule,
        DatepickerModule
    ]
})
export class DashboardModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {ProgressBarModule} from '@core/components/progress-bar/progress-bar.module';
import {PasswordStrengthBarModule} from '@core/components/password-strength-bar/password-strength-bar.module';
import {TimerModule} from '@core/components/timer/timer.module';
import {EventsModule} from '@core/services/angular-event-service/angular-events.module';
import {DatepickerModule} from '@core/components/datepicker/datepicker.module';
import {ToastrModule} from 'ngx-toastr';
import {ProjectManagementComponent} from '@app/dashboard/pages/project-management/project-management.component';
import { AdvertisingStrategyDisplayRateComponent } from './pages/product/cp-graph/advertising-strategy-display-rate/advertising-strategy-display-rate.component';
import { CpGraphComponent } from './pages/product/cp-graph/cp-graph.component';
import { OfferStrategyEffectivenessAnalysisComponent } from './pages/product/cp-graph/offer-strategy-effectiveness-analysis/offer-strategy-effectiveness-analysis.component';
import { TotalChurnRateComponent } from './pages/product/cp-graph/total-churn-rate/total-churn-rate.component';
import { AdvRemoteSettingsComponent } from './pages/product/cp-remote/adv-remote-settings/adv-remote-settings.component';
import { CpRemoteComponent } from './pages/product/cp-remote/cp-remote.component';
import { OfferRemoteSettingsComponent } from './pages/product/cp-remote/offer-remote-settings/offer-remote-settings.component';
import { DashboardFooterComponent } from './pages/product/layout/dashboard-footer/dashboard-footer.component';
import { ProductComponent } from './pages/product/product.component';
import { DashboardHeaderComponent } from './pages/product/layout/dashboard-header/dashboard-header.component';
import { DashboardNavbarComponent } from './pages/product/layout/dashboard-navbar/dashboard-navbar.component';


@NgModule({
    declarations: [
        DashboardHeaderComponent,
        DashboardFooterComponent,
        DashboardNavbarComponent,
        ProductComponent,
        CpGraphComponent,
        CpRemoteComponent,
        OfferStrategyEffectivenessAnalysisComponent,
        AdvertisingStrategyDisplayRateComponent,
        TotalChurnRateComponent,
        AdvRemoteSettingsComponent,
        OfferRemoteSettingsComponent,
        ProjectManagementComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgbDropdownModule,
        FormsModule,
        HttpClientModule,
        ProgressBarModule,
        PasswordStrengthBarModule,
        TimerModule,
        EventsModule,
        DatepickerModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right'
        }),
        DashboardRoutingModule,
        NgbDropdownModule
    ]
})
export class DashboardModule {
}

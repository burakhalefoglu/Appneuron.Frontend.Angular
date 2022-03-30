import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule, NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {ProgressBarModule} from '@core/components/progress-bar/progress-bar.module';
import {PasswordStrengthBarModule} from '@core/components/password-strength-bar/password-strength-bar.module';
import {TimerModule} from '@core/components/timer/timer.module';
import {EventsModule} from '@core/services/angular-event-service/angular-events.module';
import {DatepickerModule} from '@core/components/datepicker/datepicker.module';
import {ProjectManagementComponent} from '@app/dashboard/pages/project-management/project-management.component';
import { CpGraphComponent } from './pages/product/cp-graph/cp-graph.component';
import { AdvRemoteSettingsComponent } from './pages/product/cp-remote/adv-remote-settings/adv-remote-settings.component';
import { CpRemoteComponent } from './pages/product/cp-remote/cp-remote.component';
import { OfferRemoteSettingsComponent } from './pages/product/cp-remote/offer-remote-settings/offer-remote-settings.component';
import { DashboardFooterComponent } from './pages/product/layout/dashboard-footer/dashboard-footer.component';
import { ProductComponent } from './pages/product/product.component';
import { DashboardHeaderComponent } from './pages/product/layout/dashboard-header/dashboard-header.component';
import { DashboardNavbarComponent } from './pages/product/layout/dashboard-navbar/dashboard-navbar.component';
import {RefreshTokenComponent} from '@app/dashboard/pages/refresh-token/refresh-token.component';
import { RetentionGraphComponent } from './pages/product/cp-graph/retention-graph/retention-graph.component';
import { SessionGraphComponent } from './pages/product/cp-graph/session-graph/session-graph.component';
import { OfferStrategySuccessGraphComponent } from './pages/product/cp-graph/offer-strategy-success-graph/offer-strategy-success-graph.component';
import { AdvStrategySuccessGraphComponent } from './pages/product/cp-graph/adv-strategy-success-graph/adv-strategy-success-graph.component';
import { PaidGraphComponent } from './pages/product/cp-graph/paid-graph/paid-graph.component';
import { TotalGraphComponent } from './pages/product/cp-graph/total-graph/total-graph.component';
import { DailySessionGraphComponent } from './pages/product/cp-graph/daily-session-graph/daily-session-graph.component';


@NgModule({
    declarations: [
        DashboardHeaderComponent,
        DashboardFooterComponent,
        DashboardNavbarComponent,
        ProductComponent,
        CpGraphComponent,
        CpRemoteComponent,
        AdvRemoteSettingsComponent,
        OfferRemoteSettingsComponent,
        ProjectManagementComponent,
        RefreshTokenComponent,
        RetentionGraphComponent,
        SessionGraphComponent,
        OfferStrategySuccessGraphComponent,
        AdvStrategySuccessGraphComponent,
        PaidGraphComponent,
        TotalGraphComponent,
        DailySessionGraphComponent
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
        DashboardRoutingModule,
        NgbDropdownModule,
        NgbProgressbarModule,
    ]
})
export class DashboardModule {
}

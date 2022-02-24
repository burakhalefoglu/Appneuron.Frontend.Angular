import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardHeaderComponent} from './layout/dashboard-header/dashboard-header.component';
import {DashboardFooterComponent} from './layout/dashboard-footer/dashboard-footer.component';
import {DashboardNavbarComponent} from './layout/dashboard-navbar/dashboard-navbar.component';
import {ProjectManagementComponent} from './pages/project-management/project-management.component';
import {ProjectDetailComponent} from './pages/project-detail/project-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CpGraphComponent} from './pages/project-detail/cp-graph/cp-graph.component';
import {CpRemoteComponent} from './pages/project-detail/cp-remote/cp-remote.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
    OfferStrategyEffectivenessAnalysisComponent
} from '@app/dashboard/pages/project-detail/cp-graph/offer-strategy-effectiveness-analysis/offer-strategy-effectiveness-analysis.component';
import {
    AdvertisingStrategyDisplayRateComponent
} from '@app/dashboard/pages/project-detail/cp-graph/advertising-strategy-display-rate/advertising-strategy-display-rate.component';
import {TotalChurnRateComponent} from '@app/dashboard/pages/project-detail/cp-graph/total-churn-rate/total-churn-rate.component';
import {AdvRemoteSettingsComponent} from './pages/project-detail/cp-remote/adv-remote-settings/adv-remote-settings.component';
import {OfferRemoteSettingsComponent} from './pages/project-detail/cp-remote/offer-remote-settings/offer-remote-settings.component';


@NgModule({
    declarations: [
        DashboardHeaderComponent,
        DashboardFooterComponent,
        DashboardNavbarComponent,
        ProjectManagementComponent,
        ProjectDetailComponent,
        CpGraphComponent,
        CpRemoteComponent,
        OfferStrategyEffectivenessAnalysisComponent,
        AdvertisingStrategyDisplayRateComponent,
        TotalChurnRateComponent,
        AdvRemoteSettingsComponent,
        OfferRemoteSettingsComponent

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FontAwesomeModule
    ]
})
export class DashboardModule {
}

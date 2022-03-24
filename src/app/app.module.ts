import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from '@core/guard/auth.guard';
import {CoreInterceptorService} from '@core/interceptors/core-interceptor.service';
import {CoreService} from '@core/services/core.service';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {WebsocketService} from '@core/services/websocket.service';
import {CommonModule} from '@angular/common';
import {ProgressBarModule} from '@app/core/components/progress-bar/progress-bar.module';
import {TimerModule} from '@core/components/timer/timer.module';
import {EventsModule} from '@core/services/angular-event-service/angular-events.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { PasswordStrengthBarModule } from '@core/components/password-strength-bar/password-strength-bar.module';
import {ComingSoonComponent} from '@landing-pages/pages/coming-soon/coming-soon.component';
import {NotFoundComponent} from '@landing-pages/pages/not-found/not-found.component';
import {SidebarComponent} from '@landing-pages/layout/sidebar/sidebar.component';
import {PartnerComponent} from '@landing-pages/common/partner/partner.component';
import {FunfactComponent} from '@landing-pages/common/funfact/funfact.component';
import {HomeComponent} from '@landing-pages/pages/home/home.component';
import {HeaderComponent} from '@landing-pages/layout/header/header.component';
import {FooterComponent} from '@landing-pages/layout/footer/footer.component';
import {BlogComponent} from '@landing-pages/pages/blog/blog.component';
import {BlogDetailsComponent} from '@landing-pages/pages/blog-details/blog-details.component';
import {GenerateRandomService} from '@core/services/generate-random.service';
import {LoginOrRegisterComponent} from '@auth/login-or-register/login-or-register.component';
import {ResetComponent} from '@app/auth/reset/reset.component';
import {ForgotComponent} from '@app/auth/forgot/forgot.component';
import {DatepickerModule} from '@core/components/datepicker/datepicker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {DashboardModule} from '@app/dashboard/dashboard.module';
import { AuthComponent } from '@auth/login-or-register/auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalInfoComponent } from './profile/personal-info/personal-info.component';
import { PaymentInfoComponent } from './profile/payment-info/payment-info.component';
import { SubscriptionInfoComponent } from './profile/subscription-info/subscription-info.component';
import { PrivacyInfoComponent } from './profile/privacy-info/privacy-info.component';
import { SettingsInfoComponent } from './profile/settings-info/settings-info.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SpinnerComponent} from '@core/components/spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        FunfactComponent,
        PartnerComponent,
        AppComponent,
        BlogComponent,
        BlogDetailsComponent,
        ComingSoonComponent,
        NotFoundComponent,
        LoginOrRegisterComponent,
        ResetComponent,
        ForgotComponent,
        AuthComponent,
        ProfileComponent,
        PersonalInfoComponent,
        PaymentInfoComponent,
        SubscriptionInfoComponent,
        PrivacyInfoComponent,
        SettingsInfoComponent,
        SpinnerComponent,

    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        CommonModule,
        ProgressBarModule,
        PasswordStrengthBarModule,
        TimerModule,
        EventsModule,
        DatepickerModule,
        DashboardModule,
        BrowserAnimationsModule,
        NgbDropdownModule,
        FontAwesomeModule,
        ToastrModule.forRoot()
    ],
    providers: [
        WebsocketService,
        LocalStorageService,
        GenerateRandomService,
        CoreService,
        AuthService,
        LocalStorageService,
        AuthGuard,
        CoreInterceptorService,
        CustomerInformationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CoreInterceptorService,
            multi: true,
        }],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './landing-pages/layout/header/header.component';
import { FooterComponent } from './landing-pages/layout/footer/footer.component';
import { SidebarComponent } from './landing-pages/layout/sidebar/sidebar.component';
import { FunfactComponent } from './landing-pages/common/funfact/funfact.component';
import { PartnerComponent } from './landing-pages/common/partner/partner.component';
import { HomeComponent } from './landing-pages/pages/home/home.component';
import { BlogComponent } from './landing-pages/pages/blog/blog.component';
import { BlogDetailsComponent } from './landing-pages/pages/blog-details/blog-details.component';
import { ComingSoonComponent } from './landing-pages/pages/coming-soon/coming-soon.component';
import { NotFoundComponent } from './landing-pages/pages/not-found/not-found.component';
import { GenerateRandomService } from './core/services/generate-random.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from './core/components/auth/services/auth.service';
import { AuthGuard } from './core/guard/auth.guard';
import { CoreInterceptorService } from './core/interceptors/core-interceptor.service';
import { ConfigService } from './core/services/config.service';
import { CoreService } from './core/services/core.service';
import { CustomerInformationService } from './core/services/customer-information.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { WebsocketService } from './core/services/websocket.service';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from './core/components/progress-bar/progress-bar.module';
import { TimerModule } from './core/components/timer/timer.module';
import { EventsModule } from './core/services/angular-event-service/angular-events.module';
import { AccountModule } from './core/Components/Auth/account.module';
import { DashboardModule } from './dashboard/dashboard.module';

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
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ProgressBarModule,
    TimerModule,
    EventsModule,
    DashboardModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    WebsocketService,
    LocalStorageService,
    GenerateRandomService,
    CoreService,
    ConfigService,
    AccountModule,
    AuthService,
    LocalStorageService,
    AuthGuard,
    CoreInterceptorService,
    CustomerInformationService,
    ToastrService,
    NgxSpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreInterceptorService,
      multi: true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }

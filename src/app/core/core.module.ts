import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from './components/progress-bar/progress-bar.module';
import { TimerModule } from './components/timer/timer.module';
import { EventsModule } from './services/angular-event-service/angular-events.module';
import { AccountModule } from './components/auth/account.module';
import { WebsocketService } from './services/websocket.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './components/auth/services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { CoreInterceptorService } from './interceptors/core-interceptor.service';
import { ConfigService } from './services/config.service';
import { CoreService } from './services/core.service';
import { CustomerInformationService } from './services/customer-information.service';
import { GenerateRandomService } from './services/generate-random.service';
import { LocalStorageService } from './services/local-storage.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



@NgModule({
  providers: [
    WebsocketService,
    LocalStorageService,
    GenerateRandomService,
    CoreService,
    ConfigService,
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
    },
  ],
  declarations: [

  ],
  imports: [
    CommonModule,
    ProgressBarModule,
    TimerModule,
    EventsModule,
    AccountModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })
  ],
  exports : []
})
export class CoreModule { }

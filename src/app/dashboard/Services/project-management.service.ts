import {Injectable} from '@angular/core';
import {EventsService} from '@core/services/angular-event-service/angular-events.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {LocalStorageService} from '@core/services/local-storage.service';
import {environment} from '@environments/environment';
import {Feedback} from '@app/dashboard/pages/project-management/Models/Feedback';
import {ResponseModel} from '@core/models/response-model';
import {Rate} from '@app/dashboard/pages/project-management/Models/Rate';

@Injectable({
    providedIn: 'root'
})
export class ProjectManagementService {

    constructor(
        private events: EventsService,
        private httpClient: HttpClient,
        private router: Router,
        private customerInformationService: CustomerInformationService,
        private spinner: NgxSpinnerService,
        private storageService: LocalStorageService
    ) {
    }

    public sendFeedbackDetailed(feedback: Feedback): void {
        this.spinner.show();
        this.httpClient
            .post<ResponseModel>(
                environment.getProjectApiUrl + '/Feedbacks',
                feedback
            )
            .subscribe((data) => {
                this.spinner.hide();
                if (data.success) {
                    this.customerInformationService.showSuccess(data.message);
                    return;
                }
                this.customerInformationService.showError(data.message);
                this.spinner.hide();
            });
    }

    public sendRate(rate: Rate): void {
        this.spinner.show();
        this.httpClient
            .post<ResponseModel>(
                environment.getProjectApiUrl + '/Rates',
                rate
            )
            .subscribe((data) => {
                this.spinner.hide();
                if (data.success) {
                    this.customerInformationService.showSuccess(data.message);
                    return;
                }
                this.customerInformationService.showError(data.message);
                this.spinner.hide();
            });
    }
}

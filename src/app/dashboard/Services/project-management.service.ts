import {Injectable} from '@angular/core';
import {EventsService} from '@core/services/angular-event-service/angular-events.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {environment} from '@environments/environment';
import {Feedback} from '@app/dashboard/pages/project-management/Models/Feedback';
import {ResponseModel} from '@core/models/response-model';
import {Rate} from '@app/dashboard/pages/project-management/Models/Rate';
import {Observable} from 'rxjs';
import {CreateProjectModel, DeleteProjectModel, ProjectModel, ProjectsResponse} from '@app/dashboard/models/project-model';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '@core/services/spinner.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectManagementService {

    constructor(
        private events: EventsService,
        private httpClient: HttpClient,
        private router: Router,
        private customerInformationService: CustomerInformationService,
        private storageService: LocalStorageService,
        private spinnerService: SpinnerService
    ) {
    }

    public sendFeedbackDetailed(feedback: Feedback): void {
        this.spinnerService.showSpinner();
        this.httpClient
            .post<ResponseModel>(
                environment.getProjectApiUrl + '/Feedbacks',
                feedback
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        )
            .subscribe((data) => {
                if (data.success) {
                    this.customerInformationService.showSuccess(data.message);
                    return;
                }
                this.customerInformationService.showError(data.message);
            });
    }

    public sendRate(rate: Rate): void {
        this.spinnerService.showSpinner();
        this.httpClient
            .post<ResponseModel>(
                environment.getProjectApiUrl + '/Rates',
                rate
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        )
            .subscribe((data) => {
                if (data.success) {
                    this.customerInformationService.showSuccess(data.message);
                    return;
                }
                this.customerInformationService.showError(data.message);
            });
    }

    public getProjects(): Observable<ProjectsResponse> {
        return this.httpClient.get<ProjectsResponse>(
            environment.getProjectApiUrl + '/CustomerProjects/getall'
        );
    }

    public createProject(
        projectModel: CreateProjectModel
    ): Observable<ResponseModel> {
        this.spinnerService.showSpinner();
        return this.httpClient.post<ResponseModel>(
            environment.getProjectApiUrl + '/CustomerProjects',
            projectModel
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public deleteProject(deleteProjectModel: DeleteProjectModel): any {
        this.spinnerService.showSpinner();
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: deleteProjectModel,
        };
        return this.httpClient
            .delete(environment.getProjectApiUrl + '/CustomerProjects', options).pipe(
                finalize(() => this.spinnerService.hideSpinner()),
            );
    }
}

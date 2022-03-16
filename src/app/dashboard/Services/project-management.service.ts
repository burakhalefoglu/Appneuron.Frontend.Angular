import {Injectable} from '@angular/core';
import {EventsService} from '@core/services/angular-event-service/angular-events.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {LocalStorageService} from '@core/services/local-storage.service';
import {environment} from '@environments/environment';
import {Feedback} from '@app/dashboard/pages/project-management/Models/Feedback';
import {ResponseModel} from '@core/models/response-model';
import {Rate} from '@app/dashboard/pages/project-management/Models/Rate';
import {Observable} from 'rxjs';
import {DeleteProjectModel, ProjectModel, ProjectsResponse} from '@app/dashboard/models/project-model';

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

    public getProjects(): Observable<ProjectsResponse> {
        return this.httpClient.get<ProjectsResponse>(
            environment.getProjectApiUrl + '/CustomerProjects/getall '
        );
    }

    public createProject(
        projectModel: ProjectModel
    ): Observable<ResponseModel> {
        return this.httpClient.post<ResponseModel>(
            environment.getProjectApiUrl + '/CustomerProjects',
            projectModel
        );
    }

    public deleteProject(deleteProjectModel: DeleteProjectModel): Observable<ResponseModel> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: deleteProjectModel,
        };
        return this.httpClient
            .delete<ResponseModel>(environment.getProjectApiUrl + '/CustomerProjects', options);
    }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectIsValidResponse, ProjectResponse, ProjectsResponse} from '@app/dashboard/models/project-model';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '@core/services/spinner.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private httpClient: HttpClient,
                private spinnerService: SpinnerService) {
    }

    public customerProjectisValid(projectId: string): Observable<ProjectIsValidResponse> {
        this.spinnerService.showSpinner();
        return this.httpClient.get<ProjectIsValidResponse>(
            environment.getProjectApiUrl + '/CustomerProjects/isValid?projectId=' + projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }
    public getProjectByName(name: string): Observable<ProjectResponse> {
        this.spinnerService.showSpinner();
        return this.httpClient.get<ProjectResponse>(
            environment.getProjectApiUrl + '/CustomerProjects?name=' + name
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }
}

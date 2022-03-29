import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResponseDataModel} from '@core/models/response-data-model';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {environment} from '@environments/environment';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '@core/services/spinner.service';
import {LocalStorageService} from '@core/services/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class ChurnPredictionGraphService {
    constructor(
        private http: HttpClient,
        private customerInformationService: CustomerInformationService,
        private localStorageService: LocalStorageService,
        private spinnerService: SpinnerService
    ) {
    }

    public getChurnPredictionResult(
        projectId: string
    ): Observable<ResponseDataModel<number>> {
        this.spinnerService.showSpinner();
        return this.http.get <ResponseDataModel<number>>(
            environment.getClientApiUrl +
            '/ChurnPredictionMlResults' +
            '?projectId=' +
            projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }
}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ResponseDataModel} from '@core/models/response-data-model';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {environment} from '@environments/environment';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '@core/services/spinner.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {DatePipe} from '@angular/common';
import {OfferBehaviorSuccessDto, OfferRequest} from '@app/dashboard/pages/product/cp-graph/Models/OfferSuccess';
import {AdvRequest, AdvResponseDto} from '@app/dashboard/pages/product/cp-graph/Models/AdvShown';

@Injectable({
    providedIn: 'root',
})
export class ChurnPredictionGraphService {
    pipe = new DatePipe('en-US');

    constructor(
        private http: HttpClient,
        private customerInformationService: CustomerInformationService,
        private localStorageService: LocalStorageService,
        private spinnerService: SpinnerService,
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

    getTotalClientCount(projectId: string): Observable<ResponseDataModel<number>> {
        this.spinnerService.showSpinner();
        return this.http.get <ResponseDataModel<number>>(
            environment.getClientApiUrl +
            '/Clients/GetTotalClient' +
            '?projectId=' +
            projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    getPaidClientCount(projectId: string): Observable<ResponseDataModel<number>> {
        this.spinnerService.showSpinner();
        return this.http.get <ResponseDataModel<number>>(
            environment.getClientApiUrl +
            '/Clients/GetPaidClient' +
            '?projectId=' +
            projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    getLastSevenTotalClientCount(projectId: string): Observable<ResponseDataModel<number[]>> {
        this.spinnerService.showSpinner();
        return this.http.get <ResponseDataModel<number[]>>(
            environment.getClientApiUrl +
            '/Clients/GetTotalClientLastSevenDayCount' +
            '?projectId=' +
            projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    getLastSevenPaidClientCount(projectId: string): Observable<ResponseDataModel<number[]>> {
        this.spinnerService.showSpinner();
        return this.http.get <ResponseDataModel<number[]>>(
            environment.getClientApiUrl +
            '/Clients/GetPaidClientLastSevenDayCount' +
            '?projectId=' +
            projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    getLastSevenSessionCount(projectId: string): Observable<ResponseDataModel<number[]>> {
        this.spinnerService.showSpinner();
        return this.http.get <ResponseDataModel<number[]>>(
            environment.getClientApiUrl +
            '/GameSessions/GetDailySession' +
            '?projectId=' +
            projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    getRetention(projectId: string, d: Date): Observable<ResponseDataModel<number[]>> {
        const date = this.pipe.transform(d, 'dd/MM/yyyy');
        this.spinnerService.showSpinner();
        return this.http.get <ResponseDataModel<number[]>>(
            environment.getClientApiUrl +
            '/GameSessions/GetRetention' +
            '?projectId=' + projectId +
            '&date=' + date
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    getOfferBehaviorResult(offerRequest: OfferRequest): Observable<ResponseDataModel<OfferBehaviorSuccessDto>> {
        this.spinnerService.showSpinner();
        return this.http.post <ResponseDataModel<OfferBehaviorSuccessDto>>(
            environment.getClientApiUrl +
            '/OfferBehaviors/OfferBehaviorSuccess',
            offerRequest
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }


    getAdvShownResult(advRequest: AdvRequest): Observable<ResponseDataModel<AdvResponseDto>> {
        this.spinnerService.showSpinner();
        return this.http.post <ResponseDataModel<AdvResponseDto>>(
            environment.getClientApiUrl +
            '/AdvStrategies/AdvStrategyShownCount',
            advRequest
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    getTotalSessionByDate(projectId: string, date: Date): Observable<ResponseDataModel<number>> {
        this.spinnerService.showSpinner();
        return this.http.get <ResponseDataModel<number>>(
            environment.getClientApiUrl +
            '/GameSessions/GetSessionTimeByDate' +
            '?projectId=' + projectId +
            '&date=' + date
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }
}

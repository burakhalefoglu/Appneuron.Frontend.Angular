import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ChurnDateModel} from '@app/dashboard/pages/product/cp-remote/models/churn-date-model';
import {InterstitialAdDtoModel} from '@app/dashboard/pages/product/cp-remote/models/interstiel-ad-model';
import {OfferBehaviorDtoModel} from '@app/dashboard/pages/product/cp-remote/models/offer-behavior-dto-model';
import {OfferModel} from '@app/dashboard/pages/product/cp-remote/models/offer-model';
import {ResponseDataModel} from '@core/models/response-data-model';
import {ResponseModel} from '@core/models/response-model';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {environment} from '@environments/environment';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from '@core/services/spinner.service';

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

    public updateChurnDate(data: ChurnDateModel): Observable<ResponseModel> {
        this.spinnerService.showSpinner();
        return this.http.put<ResponseModel>(
            environment.getClientApiUrl + '/ChurnDates',
            data
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public getChurnPredictionCountByOfferDate(
        projectId: string,
        name: string,
        version: number,
        startTime: Date,
        finishTime: Date
    ): Observable<ResponseDataModel<number>> {
        this.spinnerService.showSpinner();
        return this.http.get<ResponseDataModel<number>>(
            environment.getClientApiUrl +
            '/ChurnClientPredictionResults/getPredictionCountByOfferDate' +
            '?projectId=' +
            projectId +
            '&name=' +
            name +
            '&version=' +
            version +
            '&startTime=' +
            startTime +
            '&finishTime=' +
            finishTime
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );

    }

    public getPredictionCountByDate(
        projectId: string,
        startTime: Date,
        finishTime: Date
    ): Observable<ResponseDataModel<number>> {
        this.spinnerService.showSpinner();
        return this.http.get<ResponseDataModel<number>>(
            environment.getClientApiUrl +
            '/ChurnClientPredictionResults/getPredictionCountByDate' +
            '?projectId=' +
            projectId +
            '&startTime=' +
            startTime +
            '&finishTime=' +
            finishTime
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public getChurnDate(
        projectId: bigint
    ): Observable<ResponseDataModel<ChurnDateModel>> {
        this.spinnerService.showSpinner();
        return this.http.get<ResponseDataModel<ChurnDateModel>>(
            environment.getClientApiUrl +
            '/ChurnDates/getByProjectId?projectId=' +
            projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public getOfferBehaviorDtoList(
        projectId: string,
        name: string,
        version: number
    ): Observable<ResponseDataModel<Array<OfferBehaviorDtoModel>>> {
        this.spinnerService.showSpinner();
        return this.http.get<ResponseDataModel<Array<OfferBehaviorDtoModel>>>(
            environment.getClientApiUrl +
            '/OfferBehaviorModels/getDtoList' +
            '?projectId=' +
            projectId +
            '&name=' +
            name +
            '&version=' +
            version
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public getAdvBehaviorCount(
        projectId: string,
        name: string,
        version: number,
        dateTime: Date
    ): Observable<ResponseDataModel<number>> {
        this.spinnerService.showSpinner();
        return this.http.get <ResponseDataModel<number>>(
            environment.getClientApiUrl +
            '/AdvStrategyBehaviorModels/getByAdvStrategy' +
            '?projectId=' +
            projectId +
            '&name=' +
            name +
            '&version=' +
            version +
            '&time=' +
            dateTime
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public addChurnDate(data: ChurnDateModel): void {
        this.http
            .post<ResponseModel>(environment.getClientApiUrl + '/ChurnDates', data)
            .pipe(
                finalize(() => this.spinnerService.hideSpinner()),
            ).subscribe((response: ResponseModel) => {
            if (response.success) {
                this.customerInformationService.showSuccess(response.message);
            }
        });
    }

}

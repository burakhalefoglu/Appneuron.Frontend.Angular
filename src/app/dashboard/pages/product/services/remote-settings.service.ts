import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {SpinnerService} from '@core/services/spinner.service';
import {
    InterstitialAdDeleteModel, InterstitialAdDtoModel, InterstitialAdModel,
    InterstitialAdUpdateModel
} from '@app/dashboard/pages/product/cp-remote/models/interstiel-ad-model';
import {Observable} from 'rxjs';
import {ResponseModel} from '@core/models/response-model';
import {environment} from '@environments/environment';
import {finalize} from 'rxjs/operators';
import {
    OfferModel,
    OfferModelDeleteDto,
    OfferModelUpdateDto
} from '@app/dashboard/pages/product/cp-remote/models/offer-model';
import {ResponseDataModel} from '@core/models/response-data-model';
import {OurCookieService} from '@core/services/our-cookie.service';

@Injectable({
    providedIn: 'root'
})
export class RemoteSettingsService {

    constructor(
        private http: HttpClient,
        private customerInformationService: CustomerInformationService,
        private ourCookieService: OurCookieService,
        private spinnerService: SpinnerService
    ) {
    }

    public getAdvRemoteSettings(
        projectId: string
    ): Observable<ResponseDataModel<Array<InterstitialAdModel>>> {
        this.spinnerService.showSpinner();
        return this.http.get<ResponseDataModel<Array<InterstitialAdModel>>>(
            environment.getRemoteApiUrl +
            '/InterstitialAdModels' +
            '?projectId=' + projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public addAdvRemoteSetting(data: InterstitialAdDtoModel): void {
        this.spinnerService.showSpinner();
        this.http
            .post<ResponseModel>(
                environment.getRemoteApiUrl + '/InterstitialAdModels',
                data
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        )
            .subscribe((response: ResponseModel) => {
                if (response.success) {
                    this.customerInformationService.showSuccess(response.message);
                    this.ourCookieService.removeItem('advStrategy');
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                    return;
                }
            });
    }

    public updateAdvRemoteSetting(
        data: InterstitialAdUpdateModel
    ): Observable<ResponseModel> {
        this.spinnerService.showSpinner();
        return this.http.put<ResponseModel>(
            environment.getRemoteApiUrl + '/InterstitialAdModels',
            data
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public deleteAdvRemoteSetting(
        data: InterstitialAdDeleteModel
    ): Observable<ResponseModel> {
        this.spinnerService.showSpinner();
        const deleteAdvOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: data,
        };
        return this.http.delete<ResponseModel>(
            environment.getRemoteApiUrl + '/InterstitialAdModels',
            deleteAdvOptions
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public getOfferRemoteSettings(
        projectId: number,
    ): Observable<ResponseDataModel<Array<OfferModel>>> {
        this.spinnerService.showSpinner();
        return this.http.get<ResponseDataModel<Array<OfferModel>>>(
            environment.getRemoteApiUrl +
            '/RemoteOfferModels' +
            '?projectId=' + projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public addOfferRemoteSetting(data: OfferModel): void {
        this.spinnerService.showSpinner();
        this.http
            .post<ResponseModel>(
                environment.getRemoteApiUrl + '/RemoteOfferModels',
                data
            ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        )
            .subscribe((response: ResponseModel) => {
                if (response.success) {
                    this.customerInformationService.showSuccess(response.message);
                    this.ourCookieService.removeItem('productStrategy');
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                    return;
                }
            });
    }

    public updateOfferRemoteSetting(data: OfferModelUpdateDto): Observable<ResponseModel> {
        this.spinnerService.showSpinner();
        return this.http.put<ResponseModel>(
            environment.getRemoteApiUrl + '/RemoteOfferModels',
            data
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    public deleteOfferRemoteSetting(data: OfferModelDeleteDto): Observable<ResponseModel> {
        this.spinnerService.showSpinner();
        const deleteAdvOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: data,
        };
        return this.http.delete<ResponseModel>(
            environment.getRemoteApiUrl + '/RemoteOfferModels',
            deleteAdvOptions
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        );
    }

    sendAdvStrategies(projectId: number): void {
        this.spinnerService.showSpinner();
        this.http.get<ResponseModel>(
            environment.getRemoteApiUrl + '/InterstitialAdModelEvents?projectId=' + projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        ).subscribe((response) => {
            if (response.success){
                this.customerInformationService.showSuccess('sent successfully');
                return;
            }
            this.customerInformationService.showError(response.message);
        });
    }

    sendOfferStrategies(projectId: number): void {
        this.spinnerService.showSpinner();
        this.http.get<ResponseModel>(
            environment.getRemoteApiUrl + '/RemoteOfferModelEvents?projectId=' + projectId
        ).pipe(
            finalize(() => this.spinnerService.hideSpinner()),
        ).subscribe((response) => {
            if (response.success){
                this.customerInformationService.showSuccess('sent successfully');
                return;
            }
            this.customerInformationService.showError(response.message);
        });
    }
}

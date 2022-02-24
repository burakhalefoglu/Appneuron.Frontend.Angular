import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { ChurnDateModel } from '@app/dashboard/models/churn-date-model';
import { InterstitialAdDtoModel } from '@app/dashboard/models/interstiel-ad-model';
import { OfferBehaviorDtoModel } from '@app/dashboard/models/offer-behavior-dto-model';
import { OfferModel } from '@app/dashboard/models/offer-model';
import {ResponseDataModel} from '@core/models/response-data-model';
import {ResponseModel} from '@core/models/response-model';
import {CustomerInformationService} from '@core/services/customer-information.service';
import {LocalStorageService} from '@core/services/local-storage.service';
import {environment} from '@environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChurnPredictionApiService {
  constructor(
    private http: HttpClient,
    private customerInformationService: CustomerInformationService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService
  ) {
  }

  public updateAdvRemoteSetting(
    data: InterstitialAdDtoModel
  ): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      environment.getRemoteApiUrl + '/InterstielAdModels',
      data
    );
  }

  public updateChurnDate(data: ChurnDateModel): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      environment.getClientApiUrl + '/ChurnDates',
      data
    );
  }

  public updateOfferRemoteSetting(data: OfferModel): Observable<ResponseModel> {
    return this.http.put<ResponseModel>(
      environment.getRemoteApiUrl + '/RemoteOfferModels',
      data
    );
  }

  public deleteAdvRemoteSetting(
    data: InterstitialAdDtoModel
  ): Observable<ResponseModel> {
    const deleteAdvOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.http.delete<ResponseModel>(
      environment.getRemoteApiUrl + '/InterstielAdModels',
      deleteAdvOptions
    );
  }

  public deleteOfferRemoteSetting(data: OfferModel): Observable<ResponseModel> {
    const deleteAdvOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.http.delete<ResponseModel>(
      environment.getRemoteApiUrl + '/RemoteOfferModels',
      deleteAdvOptions
    );
  }

  public getAdvRemoteSettings(
    projectId: string
  ): Observable<ResponseDataModel<Array<InterstitialAdDtoModel>>> {
    return this.http.get<ResponseDataModel<Array<InterstitialAdDtoModel>>>(
      environment.getRemoteApiUrl +
      '/InterstielAdModels/getByProjectId?projectId=' +
      projectId
    );
  }

  public getHistoryAdvRemoteSettings(
    projectId: string
  ): Observable<ResponseDataModel<Array<InterstitialAdDtoModel>>> {
    return this.http.get<ResponseDataModel<Array<InterstitialAdDtoModel>>>(
      environment.getRemoteApiUrl +
      '/InterstielAdHistoryModels/getListByProjectId?projectId=' +
      projectId
    );
  }

  public getChurnPredictionCountByOfferDate(
    projectId: string,
    name: string,
    version: number,
    startTime: Date,
    finishTime: Date
  ): Observable<ResponseDataModel<number>> {
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
    );

  }

  public getPredictionCountByDate(
    projectId: string,
    startTime: Date,
    finishTime: Date
  ): Observable<ResponseDataModel<number>> {
    return this.http.get<ResponseDataModel<number>>(
      environment.getClientApiUrl +
      '/ChurnClientPredictionResults/getPredictionCountByDate' +
      '?projectId=' +
      projectId +
      '&startTime=' +
      startTime +
      '&finishTime=' +
      finishTime
    );
  }

  public getOfferRemoteSettings(
    projectId: bigint
  ): Observable<ResponseDataModel<Array<OfferModel>>> {
    return this.http.get<ResponseDataModel<Array<OfferModel>>>(
      environment.getRemoteApiUrl +
      '/RemoteOfferModels/getByProjectId?projectId=' +
      projectId
    );
  }

  public getOfferRemoteSettingsFromHistory(
    projectId: string
  ): Observable<ResponseDataModel<Array<OfferModel>>> {
    return this.http.get<ResponseDataModel<Array<OfferModel>>>(
      environment.getRemoteApiUrl +
      '/RemoteOfferHistoryModels/getByProjectId?projectId=' +
      projectId
    );
  }

  public getChurnDate(
    projectId: bigint
  ): Observable<ResponseDataModel<ChurnDateModel>> {
    return this.http.get<ResponseDataModel<ChurnDateModel>>(
      environment.getClientApiUrl +
      '/ChurnDates/getByProjectId?projectId=' +
      projectId
    );
  }

  public getOfferBehaviorDtoList(
    projectId: string,
    name: string,
    version: number
  ): Observable<ResponseDataModel<Array<OfferBehaviorDtoModel>>> {
    return this.http.get<ResponseDataModel<Array<OfferBehaviorDtoModel>>>(
      environment.getClientApiUrl +
      '/OfferBehaviorModels/getDtoList' +
      '?projectId=' +
      projectId +
      '&name=' +
      name +
      '&version=' +
      version
    );
  }

  public getAdvBehaviorCount(
    projectId: string,
    name: string,
    version: number,
    dateTime: Date
  ): Observable<ResponseDataModel<number>> {
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
    );
  }

  public addAdvRemoteSetting(data: InterstitialAdDtoModel): void {
    this.spinner.show();
    this.http
      .post<ResponseModel>(
        environment.getRemoteApiUrl + '/InterstielAdModels',
        data
      )
      .subscribe((response: ResponseModel) => {
        this.spinner.hide();
        if (response.success) {
          this.customerInformationService.showSuccess(response.message);
          this.localStorageService.removeItem('advStrategy');
          setTimeout(() => {
            window.location.reload();
          }, 500);
          return;
        }
      });
  }

  public addChurnDate(data: ChurnDateModel): void {
    this.spinner.show();
    this.http
      .post<ResponseModel>(environment.getClientApiUrl + '/ChurnDates', data)
      .subscribe((response: ResponseModel) => {
        this.spinner.hide();
        if (response.success) {
          this.customerInformationService.showSuccess(response.message);
        }
      });
  }

  public addOfferRemoteSetting(data: OfferModel): void {
    this.spinner.show();
    console.log(data);
    this.http
      .post<ResponseModel>(
        environment.getRemoteApiUrl + '/RemoteOfferModels',
        data
      )
      .subscribe((response: ResponseModel) => {
        this.spinner.hide();
        if (response.success) {
          this.customerInformationService.showSuccess(response.message);
          this.localStorageService.removeItem('productStrategy');
          setTimeout(() => {
            window.location.reload();
          }, 500);
          return;
        }
      });
  }
}

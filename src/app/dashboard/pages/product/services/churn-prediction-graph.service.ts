import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {OfferBehaviorDtoModel} from '@app/dashboard/pages/product/cp-remote/models/offer-behavior-dto-model';
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

}

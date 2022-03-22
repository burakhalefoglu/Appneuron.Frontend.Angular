import { Injectable } from '@angular/core';
import { CoreService } from '@app/core/services/core.service';
import { FilteredOfferBehaviorModel } from '@app/dashboard/pages/product/cp-remote/models/filtered-offer-behavior-model';
import { OfferBehaviorDtoModel } from '@app/dashboard/pages/product/cp-remote/models/offer-behavior-dto-model';

@Injectable({
  providedIn: 'root',
})
export class ChurnPredictionGraphFilterService {
  constructor(private coreService: CoreService) {}

  filterOfferBehavior(
    offerBehaviorList: Array<OfferBehaviorDtoModel>,
    totalChurnUser: number
  ): FilteredOfferBehaviorModel {
    let failCount = 0;
    let successCount = 0;

    const filteredOfferBehaviorModel = new FilteredOfferBehaviorModel();

    offerBehaviorList.forEach((o) => {
      if (o.IsBuyOffer) {
        successCount += 1;
      } else if (!o.IsBuyOffer) {
        failCount += 1;
      }
    });
    const noActionCount = totalChurnUser - offerBehaviorList.length;
    filteredOfferBehaviorModel.SuccessPercent =
      this.coreService.calculateRatePercent(successCount, totalChurnUser);
    filteredOfferBehaviorModel.FailPercent =
      this.coreService.calculateRatePercent(failCount, totalChurnUser);
    filteredOfferBehaviorModel.NoActionPercent =
      this.coreService.calculateRatePercent(noActionCount, totalChurnUser);
    return filteredOfferBehaviorModel;
  }
}

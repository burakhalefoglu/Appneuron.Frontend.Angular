import {OfferProduct} from './offer-product';

export class OfferModel {
  ProjectId: number;
  IsActive: boolean;
  ProductList: Array<OfferProduct>;
  Name: string;
  FirstPrice: number;
  LastPrice: number;
  Version: string;
  PlayerPercent: number;
  IsGift: boolean;
  GiftTexture: string;
  ValidityPeriod: number;
  StartTime: number;
  FinishTime: number;
}

export class OfferModelUpdateDto{
    ProjectId: number;
    Name: string;
    IsActive: boolean;
    Version: string;
    PlayerPercent: number;

}

export class OfferModelUpdateDeleteDto{
    ProjectId: number;
    Name: string;
    Version: string;
}

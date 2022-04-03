export class OfferProduct {
    Name: string;
    Count: number;
    Image: string;
    ImageName: string;
}

export class OfferModel {
    Id: number;
    ProjectId: number;
    IsActive: boolean;
    ProductDtos: Array<OfferProduct>;
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

export class OfferModelUpdateDto {
    ProjectId: number;
    Name: string;
    IsActive: boolean;
    Version: string;
    PlayerPercent: number;

}

export class OfferModelDeleteDto {
    ProjectId: number;
    Name: string;
    Version: string;
}

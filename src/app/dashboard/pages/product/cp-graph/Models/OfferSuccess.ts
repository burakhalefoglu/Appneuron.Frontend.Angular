
export class OfferDto {
    Name: string;
    Version: string;
    Id: number;
}


export class OfferRequest {
    ProjectId: number;
    OfferDto: OfferDto[];
}

export class OfferBehaviorSuccessDto {
    OfferNames: string[];
    SuccessPercents: number[];
}

import {AdvStrategyModel} from '@app/dashboard/pages/product/cp-remote/models/adv-strategy-model';

export class InterstitialAdModel {
    Id: number;
    ProjectId: number;
    Name: string;
    Version: number;
    PlayerPercent: number;
    AdvStrategies: Array<AdvStrategyModel>;
    IsActive: boolean;
}

export class InterstitialAdDtoModel {
    ProjectId: number;
    Name: string;
    Version: number;
    PlayerPercent: number;
    AdvStrategyDtos: Array<AdvStrategyModel>;

}

export class InterstitialAdUpdateModel {
    ProjectId: number;
    Name: string;
    Version: number;
    PlayerPercent: number;
    IsActive: boolean;
}

export class InterstitialAdDeleteModel {
    ProjectId: number;
    Name: string;
    Version: number;
}

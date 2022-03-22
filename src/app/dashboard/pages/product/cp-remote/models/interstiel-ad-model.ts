import {AdvStrategyModel} from '@app/dashboard/pages/product/cp-remote/models/adv-strategy-model';

export class InterstitialAdModel {
    ProjectId: bigint;
    Name: string;
    Version: number;
    PlayerPercent: number;
    AdvStrategies: Array<AdvStrategyModel>;
    IsActive: boolean;
}

export class InterstitialAdDtoModel {
    ProjectId: bigint;
    Name: string;
    Version: number;
    PlayerPercent: number;
    AdvStrategies: Array<AdvStrategyModel>;

}

export class InterstitialAdUpdateModel {
    ProjectId: bigint;
    Name: string;
    Version: number;
    PlayerPercent: number;
    IsActive: boolean;
}

export class InterstitialAdDeleteModel {
    ProjectId: bigint;
    Name: string;
    Version: number;
}

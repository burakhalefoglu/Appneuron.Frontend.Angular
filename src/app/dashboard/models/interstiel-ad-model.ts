import {AdvStrategyModel} from './adv-strategy-model';

export class InterstitialAdDtoModel {
  ProjectId: bigint;
  Name: string;
  Version: number;
  PlayerPercent: number;
  IsAdvSettingsActive: boolean;
  AdvStrategies: Array<AdvStrategyModel>;
  startTime: number;
  finishTime: number;
}

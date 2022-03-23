import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { InterstitialAdDtoModel } from '@app/dashboard/pages/product/cp-remote/models/interstiel-ad-model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ChurnPredictionGraphService } from '../../services/churn-prediction-graph.service';

@Component({
  selector: 'app-advertising-strategy-display-rate',
  templateUrl: './advertising-strategy-display-rate.component.html',
  styleUrls: ['./advertising-strategy-display-rate.component.scss'],
})
export class AdvertisingStrategyDisplayRateComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  percent: number;
  type = 'success';
  advStrategies: Array<InterstitialAdDtoModel> = new Array<InterstitialAdDtoModel>();
  selectedStrategy: string;

  projectID: any;

  constructor(
    private churnPredictionApiService: ChurnPredictionGraphService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.projectID = params.id;
      });

    this.getAdvStrategies();
  }

  getAdvStrategies(): void {
    // this.churnPredictionApiService
    //   .getHistoryAdvRemoteSettings(this.projectID)
    //   .subscribe((dataArray) => {
    //     if (dataArray.success) {
    //       this.advStrategies = dataArray.data;
    //     }
    //   });
  }

  advTypeHandler(
    name: string,
    version: number,
    startTime: number,
    finishTime: number
  ): void {
    this.selectedStrategy = name + ' : ' + version + ':' + new Date(startTime * 1000) + ':' + new Date(finishTime * 1000);
    this.churnPredictionApiService
      .getPredictionCountByDate(this.projectID, new Date(startTime * 1000), new Date(finishTime * 1000))
      .subscribe((churnData) => {
        if (churnData.success) {
          this.churnPredictionApiService
            .getAdvBehaviorCount(
              this.projectID,
              name,
              version,
              new Date(startTime * 1000)
            )
            .subscribe((data) => {
              if (data.success) {
                this.percent = data.data / churnData.data * 100;
              }
            });
        }
      });
  }
}


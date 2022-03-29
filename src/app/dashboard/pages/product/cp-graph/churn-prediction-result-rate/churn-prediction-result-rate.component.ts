import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-churn-prediction-result-rate',
  templateUrl: './churn-prediction-result-rate.component.html',
  styleUrls: ['./churn-prediction-result-rate.component.scss']
})
export class ChurnPredictionResultRateComponent implements OnInit {

    @Input() churnPredictionResultRate: number;

  constructor() { }

  ngOnInit(): void {
  }

}

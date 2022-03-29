import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cp-graph',
  templateUrl: './cp-graph.component.html',
  styleUrls: ['./cp-graph.component.scss']
})
export class CpGraphComponent implements OnInit {

    churnPredictionResultRate: number;
    offerStrategyPercent: number;
    advStrategyPercent: number;

  constructor() { }

  ngOnInit(): void {
      this.churnPredictionResultRate = 85;
      this.offerStrategyPercent = 65;
      this.advStrategyPercent = 55;
  }

}

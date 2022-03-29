import {AfterViewInit, Component} from '@angular/core';
import Chart from 'chart.js/auto';
import * as randomColor from 'randomcolor';

@Component({
  selector: 'app-offer-strategy-success-graph',
  templateUrl: './offer-strategy-success-graph.component.html',
  styleUrls: ['./offer-strategy-success-graph.component.scss']
})
export class OfferStrategySuccessGraphComponent implements AfterViewInit {
    canvas: any;
    ctx: any;
    title = 'Offer Strategy Success Rate';

    constructor() {
    }

    ngAfterViewInit(): void {
        this.canvas = document.getElementById('offer-strategy');
        this.ctx = this.canvas.getContext('2d');
        const myChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: ['Strategy 1', 'Strategy 2', 'Strategy 3'],
                datasets: [{
                    label: '% of Rate',
                    data: [44, 77, 64],
                    borderWidth: 1,
                    borderColor: randomColor({
                        luminosity: 'light',
                        format: 'rgba',
                        alpha: 0.5
                    }),
                    backgroundColor: randomColor({
                        luminosity: 'light',
                        format: 'rgba',
                        alpha: 0.5
                    }),
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: this.title
                    },

                }
            }
        });
    }

}

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChurnPredictionGraphService} from '@app/dashboard/pages/product/services/churn-prediction-graph.service';
import {ActivatedRoute} from '@angular/router';
import Chart from 'chart.js/auto';
import * as randomColor from 'randomcolor';

@Component({
    selector: 'app-paid-visits-graph',
    templateUrl: './paid-visits-graph.component.html',
    styleUrls: ['./paid-visits-graph.component.scss']
})
export class PaidVisitsGraphComponent implements OnInit, AfterViewInit {

    projectId: string;
    canvas: any;
    ctx: any;
    color1: any;

    constructor(private churnPredictionGraphService: ChurnPredictionGraphService,
                private route: ActivatedRoute) {
    }

    ngAfterViewInit(): void {
        this.color1 = randomColor({
            luminosity: 'bright',
            format: 'rgba',
            alpha: 0.4
        });

        this.canvas = document.getElementById('paid-visits');
        this.ctx = this.canvas.getContext('2d');
        const myChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        data: [1, 12, 33, 23, 12, 33, 23],
                        fill: true,
                        backgroundColor:  this.color1,
                        pointBackgroundColor:  this.color1,
                        borderColor: this.color1,
                        pointRadius: 0,
                        spanGaps: true,
                        tension: 0.2
                    },
                ],
            },
            options: {
                events: [],
                borderColor: randomColor({
                    luminosity: 'light',
                    format: 'rgba',
                    alpha: 0.5
                }),
                responsive: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        display: false,
                    },
                    y: {
                        display: false,
                    }
                },
            },
        });
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                    this.projectId = params.projectId;
                }
            );
    }

}

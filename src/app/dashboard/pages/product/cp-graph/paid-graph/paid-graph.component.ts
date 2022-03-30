import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChurnPredictionGraphService} from '@app/dashboard/pages/product/services/churn-prediction-graph.service';
import {ActivatedRoute} from '@angular/router';
import Chart from 'chart.js/auto';
import * as randomColor from 'randomcolor';

@Component({
    selector: 'app-paid-graph',
    templateUrl: './paid-graph.component.html',
    styleUrls: ['./paid-graph.component.scss']
})
export class PaidGraphComponent implements OnInit, AfterViewInit {

    public projectId: string;
    public canvas: any;
    public ctx: any;
    public color1: any;
    public paidVisit: number;

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
        this.churnPredictionGraphService.getLastSevenPaidClientCount(this.projectId)
            .subscribe((data) => {
                if (data.success) {
                    console.log(data);
                    this.initChart(data.data.reverse());
                }
            });
    }

    private initChart(d: number[]): void {
        const myChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: ['6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'today'],
                datasets: [
                    {
                        data: d,
                        fill: true,
                        backgroundColor: this.color1,
                        pointBackgroundColor: this.color1,
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
        this.churnPredictionGraphService.getPaidClientCount(this.projectId)
            .subscribe((data) => {
                if (data.success) {
                    console.log(data);
                    this.paidVisit = data.data;
                }
            });
    }

}

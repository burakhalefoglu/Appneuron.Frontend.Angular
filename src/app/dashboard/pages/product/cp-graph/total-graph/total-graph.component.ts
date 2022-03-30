import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChurnPredictionGraphService} from '@app/dashboard/pages/product/services/churn-prediction-graph.service';
import {ActivatedRoute} from '@angular/router';
import Chart from 'chart.js/auto';
import * as randomColor from 'randomcolor';

@Component({
    selector: 'app-total-graph',
    templateUrl: './total-graph.component.html',
    styleUrls: ['./total-graph.component.scss']
})
export class TotalGraphComponent implements OnInit, AfterViewInit {

    projectId: string;
    canvas: any;
    ctx: any;
    color1: any;
    totalVisit: number;
    myChart: Chart;

    constructor(private churnPredictionGraphService: ChurnPredictionGraphService,
                private route: ActivatedRoute) {
    }

    ngAfterViewInit(): void {
        this.color1 = randomColor({
            luminosity: 'bright',
            format: 'rgba',
            alpha: 0.4
        });
        this.canvas = document.getElementById('total-visits');
        this.ctx = this.canvas.getContext('2d');
        this.churnPredictionGraphService.getLastSevenTotalClientCount(this.projectId)
            .subscribe((data) => {
                if (data.success) {
                    this.initChart(data.data.reverse());
                }
            });
    }

    private initChart(d: number[]): void {
        this.myChart = new Chart(this.ctx, {
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
        this.churnPredictionGraphService.getTotalClientCount(this.projectId)
            .subscribe((data) => {
                if (data.success) {
                    console.log(data);
                    this.totalVisit = data.data;
                }
            });
    }

}

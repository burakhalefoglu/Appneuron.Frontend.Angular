import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChurnPredictionGraphService} from '@app/dashboard/pages/product/services/churn-prediction-graph.service';
import {ActivatedRoute} from '@angular/router';
import Chart from 'chart.js/auto';
import * as randomColor from 'randomcolor';

@Component({
  selector: 'app-daily-session-graph',
  templateUrl: './daily-session-graph.component.html',
  styleUrls: ['./daily-session-graph.component.scss']
})
export class DailySessionGraphComponent implements  OnInit, AfterViewInit {

    projectId: string;
    canvas: any;
    ctx: any;

    constructor(private churnPredictionGraphService: ChurnPredictionGraphService,
                private route: ActivatedRoute) {
    }

    ngAfterViewInit(): void {
        this.canvas = document.getElementById('daily-session');
        this.ctx = this.canvas.getContext('2d');
        this.churnPredictionGraphService.getLastSevenSessionCount(this.projectId)
            .subscribe((data) => {
                if (data.success) {
                    console.log(data);
                    this.initChart(data.data.reverse());
                }
            });
    }

    private initChart(d: number[]): void {
        const myChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: ['6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'yesterday', 'today'],
                datasets: [{
                    label: '# of Session',
                    data: d,
                    barPercentage: .4,
                    backgroundColor: randomColor({
                        luminosity: 'bright',
                        format: 'rgba',
                        alpha: 0.4
                    }),
                    borderColor: randomColor({
                        luminosity: 'bright',
                        format: 'rgba',
                        alpha: 0.4
                    }),
                    borderWidth: .5,
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
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
                    },
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

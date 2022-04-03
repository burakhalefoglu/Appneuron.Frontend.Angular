import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import autocolors from 'chartjs-plugin-autocolors';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';
import {ChurnPredictionGraphService} from '@app/dashboard/pages/product/services/churn-prediction-graph.service';
import {RemoteSettingsService} from '@app/dashboard/pages/product/services/remote-settings.service';
import {ActivatedRoute} from '@angular/router';

Chart.register(autocolors);
Chart.register(zoomPlugin);
Chart.register(ChartStreaming);

@Component({
    selector: 'app-session-graph',
    templateUrl: './session-graph.component.html',
    styleUrls: ['./session-graph.component.scss']
})
export class SessionGraphComponent implements AfterViewInit, OnInit {
    canvas: any;
    ctx: any;
    public projectId: string;

    constructor(private churnPredictionService: ChurnPredictionGraphService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                    this.projectId = params.projectId;
                }
            );
    }

    ngAfterViewInit(): void {
        this.canvas = document.getElementById('session');
        this.ctx = this.canvas.getContext('2d');
        const myChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Dataset 1 (linear interpolation)',
                    backgroundColor: 'rgb(255, 159, 64)',
                    borderColor: 'rgb(255, 205, 86)',
                    fill: false,
                    borderDash: [8, 4],
                    data: []
                }]
            },
            options: {
                scales: {
                    xAxes: {
                        type: 'realtime',
                        realtime: {
                            duration: 20000,
                            refresh: 1000,
                            delay: 2000,
                            onRefresh: this.onRefresh
                        }
                    },
                    yAxes: {
                        display: true,
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Client Session'
                    },
                    zoom: {
                        zoom: {
                            wheel: {
                                enabled: true,
                            },
                            pinch: {
                                enabled: true
                            },
                            mode: 'x',
                        }
                    }
                }
            }
        });
    }

    onRefresh(chart): void {
        this.churnPredictionService.getTotalSessionByDate(this.projectId, new Date())
            .subscribe((data) => {
                chart.data.datasets.forEach((dataset) => {
                    dataset.data.push({
                        x: Date.now(),
                        y: data.data
                    });
                });
            });
    }
}

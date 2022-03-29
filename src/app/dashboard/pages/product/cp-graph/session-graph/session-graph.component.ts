import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import autocolors from 'chartjs-plugin-autocolors';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';

Chart.register(autocolors);
Chart.register(zoomPlugin);
Chart.register(ChartStreaming);

@Component({
    selector: 'app-session-graph',
    templateUrl: './session-graph.component.html',
    styleUrls: ['./session-graph.component.scss']
})
export class SessionGraphComponent implements AfterViewInit {
    canvas: any;
    ctx: any;
    constructor() {
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
        // get data from server
        const session = Math.random() * 100;
        const now = Date.now();
        chart.data.datasets.forEach( (dataset) => {
            dataset.data.push({
                x: now,
                y: session
            });
        });
    }
}

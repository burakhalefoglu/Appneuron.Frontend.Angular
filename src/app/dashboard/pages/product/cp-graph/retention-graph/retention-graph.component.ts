import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import autocolors from 'chartjs-plugin-autocolors';
import * as randomColor from 'randomcolor';

Chart.register(autocolors);

@Component({
    selector: 'app-retention-graph',
    templateUrl: './retention-graph.component.html',
    styleUrls: ['./retention-graph.component.scss']
})
export class RetentionGraphComponent implements AfterViewInit {
    canvas: any;
    ctx: any;
    color1: any;

    constructor() {
    }

    ngAfterViewInit(): void {
        this.color1 = randomColor({
            luminosity: 'bright',
            format: 'rgba',
            alpha: 0.6
        });
        this.canvas = document.getElementById('retention');
        this.ctx = this.canvas.getContext('2d');
        const myChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: ['Day: 0', 'Day: 1', 'Day: 3', 'Day: 7', 'Day: 14', 'Day: 30'],
                datasets: [{
                    label: '# of Retention',
                    data: [100, 85, 46, 15, 6, 1],
                    borderWidth: 2,
                    fill: false,
                    backgroundColor:  this.color1,
                    pointBackgroundColor:  this.color1,
                    borderColor: this.color1,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Retention'
                    }
                }
            }
        });
    }

}

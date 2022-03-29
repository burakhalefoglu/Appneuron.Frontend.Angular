import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import autocolors from 'chartjs-plugin-autocolors';

Chart.register(autocolors);

@Component({
    selector: 'app-retention-graph',
    templateUrl: './retention-graph.component.html',
    styleUrls: ['./retention-graph.component.scss']
})
export class RetentionGraphComponent implements AfterViewInit {
    canvas: any;
    ctx: any;

    constructor() {
    }

    ngAfterViewInit(): void {
        this.canvas = document.getElementById('retention');
        this.ctx = this.canvas.getContext('2d');
        const myChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: ['Day: 0', 'Day: 1', 'Day: 3', 'Day: 7', 'Day: 14', 'Day: 30'],
                datasets: [{
                    label: '# of Retention',
                    data: [100, 85, 46, 15, 6, 1],
                    borderWidth: 1
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

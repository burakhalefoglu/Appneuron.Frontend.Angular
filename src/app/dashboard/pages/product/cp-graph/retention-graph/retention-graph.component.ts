import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import autocolors from 'chartjs-plugin-autocolors';
import * as randomColor from 'randomcolor';
import {ChurnPredictionGraphService} from '@app/dashboard/pages/product/services/churn-prediction-graph.service';
import {ActivatedRoute} from '@angular/router';

Chart.register(autocolors);

@Component({
    selector: 'app-retention-graph',
    templateUrl: './retention-graph.component.html',
    styleUrls: ['./retention-graph.component.scss']
})
export class RetentionGraphComponent implements AfterViewInit, OnInit {
    canvas: any;
    ctx: any;
    color1: any;
    selectedDate: Date;
    public projectId: string;
    myChart: Chart;

    constructor(private churnPredictionService: ChurnPredictionGraphService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const dateOffset = (24 * 60 * 60 * 1000) * 30;
        const myDate = new Date();
        myDate.setTime(myDate.getTime() - dateOffset);
        this.selectedDate = myDate;
        this.route.queryParams
            .subscribe(params => {
                    this.projectId = params.projectId;
                }
            );
    }

    onDateChange(d: Date): void {
        this.churnPredictionService.getRetention(this.projectId, d)
            .subscribe((data) => {
                if (data.success) {
                    // update chart
                    this.initchart(data.data);
                }
            });
    }

    ngAfterViewInit(): void {
        this.color1 = randomColor({
            luminosity: 'bright',
            format: 'rgba',
            alpha: 0.6
        });
        this.canvas = document.getElementById('retention');
        this.ctx = this.canvas.getContext('2d');
        this.churnPredictionService.getRetention(this.projectId, this.selectedDate)
            .subscribe((data) => {
                if (data.success) {
                    // [100, 85, 46, 15, 6, 1]
                    console.log(data.data);
                    this.initchart(data.data);
                }
            });
    }

    private initchart(d: number[]): void {
        if (this.myChart !== undefined) {
            this.myChart.destroy();
        }
        this.myChart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: ['Day: 0', 'Day: 1', 'Day: 3', 'Day: 7', 'Day: 14', 'Day: 30'],
                datasets: [{
                    label: '# of Retention',
                    data: d,
                    borderWidth: 2,
                    fill: false,
                    backgroundColor: this.color1,
                    pointBackgroundColor: this.color1,
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

import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import * as randomColor from 'randomcolor';
import {ChurnPredictionGraphService} from '@app/dashboard/pages/product/services/churn-prediction-graph.service';
import {RemoteSettingsService} from '@app/dashboard/pages/product/services/remote-settings.service';
import {ActivatedRoute} from '@angular/router';
import {OfferBehaviorSuccessDto, OfferDto, OfferRequest} from '@app/dashboard/pages/product/cp-graph/Models/OfferSuccess';
import {AdvDto, AdvRequest, AdvResponseDto} from '@app/dashboard/pages/product/cp-graph/Models/AdvShown';

@Component({
    selector: 'app-adv-strategy-shown-graph',
    templateUrl: './adv-strategy-shown-graph.component.html',
    styleUrls: ['./adv-strategy-shown-graph.component.scss']
})
export class AdvStrategyShownGraphComponent implements AfterViewInit, OnInit {
    canvas: any;
    ctx: any;
    title = 'Adv Strategy Shown Count';
    public projectId: string;

    constructor(private churnPredictionService: ChurnPredictionGraphService,
                private remoteSettingsService: RemoteSettingsService,
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
        this.canvas = document.getElementById('adv-strategy');
        this.ctx = this.canvas.getContext('2d');
        const advRequest = new AdvRequest();
        advRequest.ProjectId = Number(this.projectId);
        this.remoteSettingsService.getAdvRemoteSettings(this.projectId)
            .subscribe(data => {
                const advDtos = new Array<AdvDto>();
                data.data.forEach(x => {
                    const advDto = new AdvDto();
                    advDto.Id = x.Id;
                    advDto.Name = x.Name;
                    advDto.Version = x.Version.toString();
                    advDtos.push(advDto);
                });
                if (advDtos.length === 0) {
                    const advResponseDto = new AdvResponseDto();
                    advResponseDto.StrategyNames = ['No Strategy'];
                    advResponseDto.Counts = [0];
                    this.initchart(advResponseDto);
                    return;
                }
                advRequest.AdvDto = advDtos;
                this.churnPredictionService.getAdvShownResult(advRequest)
                    .subscribe((d) => {
                        if (d.success) {
                            const advResponseDto = new AdvResponseDto();
                            console.log(d.data);
                            if (d.data.Counts.length === 0) {
                                advResponseDto.StrategyNames = ['No Strategy'];
                                advResponseDto.Counts = [0];
                                this.initchart(advResponseDto);
                                return;
                            }
                            advResponseDto.StrategyNames = d.data.StrategyNames; // ['Strategy 1', 'Strategy 2', 'Strategy 3'];
                            advResponseDto.Counts = d.data.Counts; // [44, 77, 64];
                            this.initchart(advResponseDto);
                        }
                    });
            });
    }

    private initchart(advResponseDto: AdvResponseDto): void {
        const myChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: advResponseDto.StrategyNames,
                datasets: [{
                    label: '# of count',
                    data: advResponseDto.Counts,
                    borderWidth: .5,
                    barPercentage: .4,
                    borderRadius: 6,
                    borderSkipped: false,
                    borderColor: randomColor({
                        luminosity: 'bright',
                        format: 'rgba',
                        alpha: 0.5
                    }),
                    backgroundColor: randomColor({
                        luminosity: 'bright',
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

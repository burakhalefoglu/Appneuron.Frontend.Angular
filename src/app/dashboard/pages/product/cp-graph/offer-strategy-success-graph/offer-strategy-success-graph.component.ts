import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import * as randomColor from 'randomcolor';
import {OfferBehaviorSuccessDto, OfferDto, OfferRequest} from '@app/dashboard/pages/product/cp-graph/Models/OfferSuccess';
import {ChurnPredictionGraphService} from '@app/dashboard/pages/product/services/churn-prediction-graph.service';
import {ActivatedRoute} from '@angular/router';
import {RemoteSettingsService} from '@app/dashboard/pages/product/services/remote-settings.service';

@Component({
    selector: 'app-offer-strategy-success-graph',
    templateUrl: './offer-strategy-success-graph.component.html',
    styleUrls: ['./offer-strategy-success-graph.component.scss']
})
export class OfferStrategySuccessGraphComponent implements AfterViewInit, OnInit {
    canvas: any;
    ctx: any;
    title = 'Offer Strategy Success Rate';
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
        this.canvas = document.getElementById('offer-strategy');
        this.ctx = this.canvas.getContext('2d');
        const offerRequest = new OfferRequest();
        offerRequest.ProjectId = Number(this.projectId);
        this.remoteSettingsService.getOfferRemoteSettings(this.projectId)
            .subscribe(data => {
                const offerDtos = new Array<OfferDto>();
                data.data.forEach(x => {
                    const offerDto = new OfferDto();
                    offerDto.Id = x.Id;
                    offerDto.Name = x.Name;
                    offerDto.Version = x.Version;
                    offerDtos.push(offerDto);
                });
                if (offerDtos.length === 0) {
                    const offerBehaviorSuccessDto = new OfferBehaviorSuccessDto();
                    offerBehaviorSuccessDto.OfferNames = ['No Strategy'];
                    offerBehaviorSuccessDto.SuccessPercents = [0];
                    this.initchart(offerBehaviorSuccessDto);
                    return;
                }
                offerRequest.OfferDto = offerDtos;
                this.churnPredictionService.getOfferBehaviorResult(offerRequest)
                    .subscribe((d) => {
                        if (d.success) {
                            const offerBehaviorSuccessDto = new OfferBehaviorSuccessDto();
                            if (d.data.OfferNames.length === 0) {
                                offerBehaviorSuccessDto.OfferNames = ['No Strategy'];
                                offerBehaviorSuccessDto.SuccessPercents = [0];
                                this.initchart(offerBehaviorSuccessDto);
                                return;
                            }
                            offerBehaviorSuccessDto.OfferNames = d.data.OfferNames; // ['Strategy 1', 'Strategy 2', 'Strategy 3'];
                            offerBehaviorSuccessDto.SuccessPercents = d.data.SuccessPercents; // [44, 77, 64];
                            this.initchart(offerBehaviorSuccessDto);
                        }
                    });
            });
    }

    private initchart(offerBehaviorSuccessDto: OfferBehaviorSuccessDto): void {
        const myChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: offerBehaviorSuccessDto.OfferNames,
                datasets: [{
                    label: '% of Rate',
                    data: offerBehaviorSuccessDto.SuccessPercents,
                    borderWidth: .5,
                    borderRadius: 6,
                    barPercentage: .4,
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

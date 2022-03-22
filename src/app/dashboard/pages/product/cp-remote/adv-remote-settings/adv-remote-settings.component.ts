import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ResponseDataModel} from '@app/core/models/response-data-model';
import {ResponseModel} from '@app/core/models/response-model';
import {CustomerInformationService} from '@app/core/services/customer-information.service';
import {LocalStorageService} from '@app/core/services/local-storage.service';
import {AdvStrategyModel} from '@app/dashboard/pages/product/cp-remote/models/adv-strategy-model';
import {
    InterstitialAdDeleteModel,
    InterstitialAdDtoModel, InterstitialAdModel,
    InterstitialAdUpdateModel
} from '@app/dashboard/pages/product/cp-remote/models/interstiel-ad-model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ChurnPredictionGraphService} from '../../services/churn-prediction-graph.service';
import {RemoteSettingsService} from '@app/dashboard/pages/product/services/remote-settings.service';

@Component({
    selector: 'app-adv-remote-settings',
    templateUrl: './adv-remote-settings.component.html',
    styleUrls: ['./adv-remote-settings.component.scss'],
})
export class AdvRemoteSettingsComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    timeout: any = null;
    AdvStrategyFormGroup: FormGroup;

    interstitialAdModelList: Array<InterstitialAdModel> =
        new Array<InterstitialAdModel>();

    isActiveStrategyList: Array<boolean> = new Array<boolean>();

    playerPercentList: Array<number> = new Array<number>();

    strategyMap: Map<string, number> = new Map<string, number>();

    strategyName: string;
    count: string;
    name: string;
    version: string;
    projectID: any;

    constructor(
        private formBuilder: FormBuilder,
        private customerInformationService: CustomerInformationService,
        private localStorageService: LocalStorageService,
        private remoteSettingsService: RemoteSettingsService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params) => {
                this.projectID = params.id;
            });
        if (this.localStorageService.getItem('advStrategy') != null) {
            this.strategyMap = new Map(
                JSON.parse(this.localStorageService.getItem('advStrategy'))
            );
        }
        this.advFormEvent();
        this.getAdvStrategies();
    }

    advFormEvent(): void {
        this.AdvStrategyFormGroup = this.formBuilder.group({
            Name: new FormControl('', [Validators.required]),
            Version: new FormControl('', [Validators.required, Validators.min(0)]),
            StrategyName: new FormControl(),
            Count: new FormControl(),
            PlayerPercent: new FormControl(),
        });
    }

    percentOnChange(event: any, i: number): void {
        clearTimeout(this.timeout);
        const $this = this;
        this.timeout = setTimeout(() => {
            if (event.keyCode !== 13) {
                $this.percentHandler(event, i);
            }
        }, 1000);
    }

    percentHandler(event: any, i: number): void {
        this.playerPercentList[i] = event.target.value;
        let totalPercent = 0;
        const targetValue = Number(event.target.value);

        if (targetValue < 0) {
            this.customerInformationService.showError(
                'The percentage rate Must be greater than 0'
            );
            this.playerPercentList[i] = null;
            return;
        }

        if (targetValue > 100) {
            this.customerInformationService.showError(
                'The total percentage rate should be equal to 100'
            );
            this.playerPercentList[i] = null;
            return;
        }

        if (this.playerPercentList.length === 0) {
            this.playerPercentList.push(targetValue);
            totalPercent = targetValue;
            if (totalPercent === 100) {
                this.interstitialAdModelList[i].PlayerPercent = targetValue;
                this.updateStrategy();
                return;
            }
        }

        this.playerPercentList.forEach((value, index) => {
            if (index === i) {
                totalPercent += targetValue;
            } else {
                totalPercent += value;
            }
        });

        if (totalPercent > 100) {
            this.customerInformationService.showError(
                'The total percentage rate should be equal to 100'
            );
            this.playerPercentList[i] = null;
            return;
        }

        this.playerPercentList[i] = targetValue;

        if (totalPercent === 100) {
            this.interstitialAdModelList[i].PlayerPercent = targetValue;
            this.updateStrategy();
            return;
        }

        this.interstitialAdModelList[i].PlayerPercent = targetValue;
        this.customerInformationService.showInfo('Change saved');
        this.customerInformationService.showWarning(
            'Please complete strategies to 100!'
        );
    }

    updateStrategy(): void {
        for (const interstitialAdModel of this.interstitialAdModelList) {
            const interstitialAdUpdateModel = new InterstitialAdUpdateModel();
            interstitialAdUpdateModel.Version = interstitialAdModel.Version;
            interstitialAdUpdateModel.Name = interstitialAdModel.Name;
            interstitialAdUpdateModel.PlayerPercent = interstitialAdModel.PlayerPercent;
            interstitialAdUpdateModel.ProjectId = interstitialAdModel.ProjectId;
            interstitialAdUpdateModel.IsActive = true;

            this.remoteSettingsService
                .updateAdvRemoteSetting(interstitialAdUpdateModel)
                .subscribe((response: ResponseModel) => {
                    if (response.success) {
                        this.customerInformationService.showSuccess(response.message);
                    }
                });
        }
    }

    changeStrategyStatuse(i: number, statuse: boolean): void {
        const adv = {...this.interstitialAdModelList[i]};
        const jsonObj = JSON.stringify(adv);
        const model: InterstitialAdModel = JSON.parse(jsonObj);
        model.IsActive = statuse;
        if (statuse === false) {
            model.PlayerPercent = 0;
        }
        const interstitialAdUpdateModel = new InterstitialAdUpdateModel();
        interstitialAdUpdateModel.Version = model.Version;
        interstitialAdUpdateModel.Name = model.Name;
        interstitialAdUpdateModel.PlayerPercent = model.PlayerPercent;
        interstitialAdUpdateModel.ProjectId = model.ProjectId;
        interstitialAdUpdateModel.IsActive = model.IsActive;

        this.remoteSettingsService
            .updateAdvRemoteSetting(interstitialAdUpdateModel)
            .subscribe((response: ResponseModel) => {
                if (response.success) {
                    this.interstitialAdModelList[i].IsActive = statuse;
                    this.isActiveStrategyList[i] = statuse;
                    if (statuse === false) {
                        this.playerPercentList[i] = 0;
                        this.interstitialAdModelList[i].PlayerPercent = 0;
                        return;
                    }
                }
            });
    }

    removeStrategy(i: number): void {
        const interstitialAdDeleteModel = new InterstitialAdDeleteModel();
        interstitialAdDeleteModel.Version =  this.interstitialAdModelList[i].Version;
        interstitialAdDeleteModel.Name =  this.interstitialAdModelList[i].Name;
        interstitialAdDeleteModel.ProjectId =  this.interstitialAdModelList[i].ProjectId;
        this.remoteSettingsService
            .deleteAdvRemoteSetting(interstitialAdDeleteModel)
            .subscribe((response) => {
                // ? Because of angular Bug, We have to parse json :(
                const obj = JSON.parse(response.toString());
                if (obj.success) {
                    this.customerInformationService.showSuccess(response.message);
                    this.interstitialAdModelList.splice(i, 1);
                    this.playerPercentList.splice(i, 1);
                }
            });
    }

    getAdvStrategies(): void {
        this.remoteSettingsService
            .getAdvRemoteSettings(this.projectID)
            .subscribe((response: ResponseDataModel<Array<InterstitialAdModel>>) => {
                for (const key in response.data) {
                    if (Object.prototype.hasOwnProperty.call(response.data, key)) {
                        const element = response.data[key];
                        this.interstitialAdModelList.push(element);

                        // tslint:disable-next-line: no-string-literal
                        this.isActiveStrategyList.push(element['isAdvSettingsActive']);

                        // tslint:disable-next-line: no-string-literal
                        this.playerPercentList.push(element['playerPercent']);
                    }
                }
            });
    }

    sendAdvStrategyToServer(): void {
        if (this.strategyMap.size <= 0) {
            this.customerInformationService.showError('add least one strategy');
            return;
        }
        if (this.AdvStrategyFormGroup.value.Name.trim() === '') {
            this.customerInformationService.showWarning('Name cant be empty');
            return;
        }
        const interstitialAdModel = new InterstitialAdDtoModel();
        interstitialAdModel.Name = this.AdvStrategyFormGroup.value.Name;
        interstitialAdModel.Version = this.AdvStrategyFormGroup.value.Version;
        interstitialAdModel.PlayerPercent = 0;
        interstitialAdModel.ProjectId = this.projectID;
        interstitialAdModel.AdvStrategies = new Array<AdvStrategyModel>();
        for (const obj of this.strategyMap) {
            const advStrategyModel = new AdvStrategyModel();
            advStrategyModel.Name = obj[0];
            advStrategyModel.StrategyValue = obj[1];
            interstitialAdModel.AdvStrategies.push(advStrategyModel);
        }
        this.remoteSettingsService.addAdvRemoteSetting(interstitialAdModel);
        this.name = null;
        this.version = null;
    }

    addStrategyOnLocalStorage(): void {
        if (this.AdvStrategyFormGroup.value.Count === null) {
            this.customerInformationService.showWarning(
                'The count is not a valid type'
            );
            return;
        }

        if (this.AdvStrategyFormGroup.value.StrategyName === null) {
            this.customerInformationService.showWarning(
                'Strategy Name cant be empty'
            );
            return;
        }

        if (this.AdvStrategyFormGroup.value.StrategyName.trim() === '') {
            this.customerInformationService.showWarning(
                'Strategy Name cant be empty'
            );
            return;
        }

        this.strategyMap.set(
            this.AdvStrategyFormGroup.value.StrategyName,
            this.AdvStrategyFormGroup.value.Count
        );

        this.localStorageService.setItem(
            'advStrategy',
            JSON.stringify(Array.from(this.strategyMap.entries()))
        );

        this.AdvStrategyFormGroup.value.StrategyName = null;
        this.strategyName = null;
        this.count = null;
        this.AdvStrategyFormGroup.value.Count = null;
    }

    removeStrategyFromForm(key: string): void {
        this.strategyMap.delete(key);
        this.localStorageService.setItem(
            'advStrategy',
            JSON.stringify(Array.from(this.strategyMap.entries()))
        );
    }
}

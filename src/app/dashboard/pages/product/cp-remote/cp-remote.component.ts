import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CustomerInformationService} from '@app/core/services/customer-information.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { ChurnDateModel } from '@app/dashboard/models/churn-date-model';
import { ChurnPredictionApiService } from '../services/churn-prediction-api.service';

@Component({
    selector: 'app-cp-remote',
    templateUrl: './cp-remote.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./cp-remote.component.scss'],
})
export class CpRemoteComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    isAdvPageActive = false;
    selectedChurnDropdownDateType: string;
    churnDateMinute = 0;
    timeout: any = null;
    projectId: bigint;

    constructor(
        private churnPredictionApiService: ChurnPredictionApiService,
        private route: ActivatedRoute,
        private customerInformationService: CustomerInformationService
    ) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params) => {
                this.projectId = params.id;
            });
        this.isAdvPageActive = this.isAdvPageActiveValueFromLocalStorage();
        this.getChurnDate();
    }

    getChurnDate(): void {
        this.churnPredictionApiService
            .getChurnDate(this.projectId)
            .subscribe((data) => {
                if (data.data == null) {
                    this.selectedChurnDropdownDateType = 'Day';
                    this.churnDateMinute = 1;
                    const churnDate = new ChurnDateModel();
                    churnDate.ChurnDateMinutes = 24 * 60;
                    churnDate.DateTypeOnGui = 'Day';
                    churnDate.ProjectId = this.projectId;
                    this.churnPredictionApiService.addChurnDate(churnDate);
                    return;
                }
                // tslint:disable-next-line: no-string-literal
                this.selectedChurnDropdownDateType = data.data['dateTypeOnGui'];

                // tslint:disable-next-line: no-string-literal
                const minute = data.data['churnDateMinutes'];

                if (this.selectedChurnDropdownDateType === 'Day') {
                    this.churnDateMinute = minute / (24 * 60);
                    return;
                }
                this.churnDateMinute = minute / 60;
            });
    }

    churnOnChange(event: any): void {
        clearTimeout(this.timeout);
        const $this = this;
        this.timeout = setTimeout(() => {
            if (event.keyCode !== 13) {
                $this.churnOnChangeHandler(event);
            }
        }, 1000);
    }

    churnOnChangeHandler(event: any): void {
        const value = event.target.value;
        const churnDate = new ChurnDateModel();
        churnDate.ProjectId = this.projectId;
        churnDate.DateTypeOnGui = this.selectedChurnDropdownDateType;

        if (this.selectedChurnDropdownDateType === 'Day') {
            churnDate.ChurnDateMinutes = value * 24 * 60;
        } else {
            churnDate.ChurnDateMinutes = value * 60;
        }
        this.churnPredictionApiService
            .updateChurnDate(churnDate)
            .subscribe((data) => {
                if (data.success) {
                    this.customerInformationService.showSuccess(data.message);
                }
            });
    }

    selectChurnDateType(value: number): void {
        if (value === 1) {
            this.selectedChurnDropdownDateType = 'Hour';
            return;
        }
        this.selectedChurnDropdownDateType = 'Day';
    }

    advClickEvent(): void {
        this.isAdvPageActive = true;
        localStorage.setItem('isAdvPageActive', 'active');
    }

    offerClickEvent(): void {
        this.isAdvPageActive = false;
        localStorage.setItem('isAdvPageActive', 'deactive');
    }

    isAdvPageActiveValueFromLocalStorage(): boolean {
        const isAdvPageActiveValue = localStorage.getItem('isAdvPageActive');
        if (isAdvPageActiveValue === 'deactive') {
            return false;
        }
        return true;
    }
}


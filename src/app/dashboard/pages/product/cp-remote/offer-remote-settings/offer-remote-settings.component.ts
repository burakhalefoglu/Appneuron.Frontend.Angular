import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {ResponseDataModel} from '@app/core/models/response-data-model';
import {ResponseModel} from '@app/core/models/response-model';
import {CoreService} from '@app/core/services/core.service';
import {CustomerInformationService} from '@app/core/services/customer-information.service';
import {LocalStorageService} from '@app/core/services/local-storage.service';
import {
    OfferModel, OfferModelDeleteDto,
    OfferModelUpdateDto,
    OfferProduct
} from '@app/dashboard/pages/product/cp-remote/models/offer-model';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {RemoteSettingsService} from '@app/dashboard/pages/product/services/remote-settings.service';

@Component({
    selector: 'app-offer-remote-settings',
    templateUrl: './offer-remote-settings.component.html',
    styleUrls: ['./offer-remote-settings.component.scss'],
})
export class OfferRemoteSettingsComponent implements OnInit {
    destroy$: Subject<boolean> = new Subject<boolean>();
    timeout: any = null;

    OfferStrategyFormGroup: FormGroup;
    giftImage: ArrayBuffer = null;
    productImage: ArrayBuffer = null;

    pngImage = 'https://cdn-icons-png.flaticon.com/512/337/337948.png';

    GiftimageName = 'Upload Gift Image';
    GiftImageSrc: string | SafeResourceUrl = this.pngImage;

    PoductImageName = 'Upload Product Image';
    PoductImageSrc: string | SafeResourceUrl = this.pngImage;

    offerModelList: Array<OfferModel> = new Array<OfferModel>();
    offerProductList: Array<OfferProduct> = new Array<OfferProduct>();
    offerImageLinkList: Array<SafeResourceUrl> = new Array<SafeResourceUrl>();

    isActiveOfferList: Array<boolean> = new Array<boolean>();
    playerPercentList: Array<number> = new Array<number>();

    name: string;
    version: number;
    firstPrice: number;
    lastPrice: number;
    validityPeriod: number;
    isGift = false;

    productName: string;
    productCount: number;
    projectId: number;

    constructor(
        private formBuilder: FormBuilder,
        private customerInformationService: CustomerInformationService,
        private localStorageService: LocalStorageService,
        private remoteSettingsService: RemoteSettingsService,
        private route: ActivatedRoute,
        public coreService: CoreService
    ) {
    }

    ngOnInit(): void {
        if (
            this.localStorageService.getItem('productStrategy') != null &&
            this.localStorageService.getItem('productImageList') != null
        ) {
            this.offerProductList = JSON.parse(
                this.localStorageService.getItem('productStrategy')
            );
            this.offerProductList.forEach((_, i) => {
                this.offerImageLinkList.push(
                    this.coreService.showImage(
                        this.coreService.str2ab(this.offerProductList[i].Image)
                    )
                );
            });
        }

        this.route.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe((params) => {
                this.projectId = params.projectId;
            });
        this.offerFormEvent();
        this.getOfferStrategies();
    }

    offerFormEvent(): void {
        this.OfferStrategyFormGroup = this.formBuilder.group({
            Name: new FormControl('', [Validators.required]),
            Version: new FormControl('', [Validators.required, Validators.min(0)]),
            FirstPrice: new FormControl('', [Validators.required, Validators.min(0)]),
            LastPrice: new FormControl('', [Validators.required, Validators.min(0)]),
            ValidityPeriod: new FormControl('', [
                Validators.required,
                Validators.min(0.1),
            ]),
            IsGift: new FormControl(),
            ProductName: new FormControl(),
            ProductCount: new FormControl(),
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
                this.offerModelList[i].PlayerPercent = targetValue;
                this.offerModelList[i].IsActive = true;
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
            this.offerModelList[i].PlayerPercent = targetValue;
            this.offerModelList[i].IsActive = true;
            this.updateStrategy();
            return;
        }

        this.offerModelList[i].PlayerPercent = targetValue;
        this.customerInformationService.showInfo('Change saved.');
        this.customerInformationService.showWarning(
            'Please complete strategies to 100!'
        );
    }

    updateStrategy(): void {
        for (const offerModel of this.offerModelList) {
            const offerModelUpdateDto = new OfferModelUpdateDto();
            offerModelUpdateDto.Name = offerModel.Name;
            offerModelUpdateDto.IsActive = offerModel.IsActive;
            offerModelUpdateDto.PlayerPercent = offerModel.PlayerPercent;
            offerModelUpdateDto.Version = offerModel.Version;
            offerModelUpdateDto.ProjectId = offerModel.ProjectId;

            this.remoteSettingsService
                .updateOfferRemoteSetting(offerModelUpdateDto)
                .subscribe((response: ResponseModel) => {
                    if (response.success) {
                        this.customerInformationService.showSuccess(response.message);
                    }
                });
        }
    }

    changeStrategyStatuse(i: number, statuse: boolean): void {
        const offer = {...this.offerModelList[i]};
        const jsonObj = JSON.stringify(offer);
        const model: OfferModel = JSON.parse(jsonObj);
        model.IsActive = statuse;
        if (statuse === false) {
            model.PlayerPercent = 0;
        }
        const offerModelUpdateDto = new OfferModelUpdateDto();
        offerModelUpdateDto.Name = model.Name;
        offerModelUpdateDto.ProjectId = model.ProjectId;
        offerModelUpdateDto.Version = model.Version;
        offerModelUpdateDto.IsActive = model.IsActive;
        offerModelUpdateDto.PlayerPercent = model.PlayerPercent;

        this.remoteSettingsService
            .updateOfferRemoteSetting(offerModelUpdateDto)
            .subscribe((response: ResponseModel) => {
                if (response.success) {
                    this.offerModelList[i].IsActive = statuse;
                    this.isActiveOfferList[i] = statuse;
                    if (statuse === false) {
                        this.playerPercentList[i] = 0;
                        this.offerModelList[i].PlayerPercent = 0;
                        return;
                    }
                }
            });
    }

    removeStrategy(i: number): void {
        const offerModelDeleteDto = new OfferModelDeleteDto();
        offerModelDeleteDto.ProjectId = this.offerModelList[i]['projectId'];
        offerModelDeleteDto.Name = this.offerModelList[i]['name'];
        offerModelDeleteDto.Version = this.offerModelList[i]['version'];
        this.remoteSettingsService
            .deleteOfferRemoteSetting(offerModelDeleteDto)
            .subscribe((response) => {
                const obj = JSON.parse(response.toString());
                if (obj.success) {
                    this.customerInformationService.showSuccess(response.message);
                    this.offerModelList.splice(i, 1);
                    this.playerPercentList.splice(i, 1);
                }
            });
    }

    getOfferStrategies(): void {
        this.remoteSettingsService
            .getOfferRemoteSettings(this.projectId)
            .subscribe((response: ResponseDataModel<Array<OfferModel>>) => {
                for (const element of response.data) {
                    this.offerModelList.push(element);
                    this.isActiveOfferList.push(element['isActive']);
                    this.playerPercentList.push(element['playerPercent']);
                }
            });
    }

    sendOfferStrategyToServer(): void {
        if (this.offerProductList.length <= 0) {
            this.customerInformationService.showError(
                'Please Add at least one product'
            );
            return;
        }

        if (this.isGift && this.giftImage == null) {
            this.customerInformationService.showError('Please Add gift Image');
            return;
        }

        if (this.OfferStrategyFormGroup.value.Name.trim() === '') {
            this.customerInformationService.showWarning('Name cant be empty');
            return;
        }

        if (
            this.OfferStrategyFormGroup.value.FirstPrice <
            this.OfferStrategyFormGroup.value.LastPrice
        ) {
            this.customerInformationService.showWarning(
                'First price cannot be smaller than Last price'
            );
            return;
        }

        const offerModel = new OfferModel();
        offerModel.ProjectId = this.projectId;
        offerModel.IsActive = false;
        offerModel.Name = this.OfferStrategyFormGroup.value.Name;
        offerModel.FirstPrice = this.OfferStrategyFormGroup.value.FirstPrice;
        offerModel.LastPrice = this.OfferStrategyFormGroup.value.LastPrice;
        offerModel.Version = this.OfferStrategyFormGroup.value.Version;
        offerModel.ValidityPeriod =
            this.OfferStrategyFormGroup.value.ValidityPeriod;
        offerModel.PlayerPercent = 0;
        offerModel.IsGift = this.OfferStrategyFormGroup.value.IsGift;
        if (
            this.OfferStrategyFormGroup.value.IsGift == null ||
            this.OfferStrategyFormGroup.value.IsGift === false
        ) {
            offerModel.IsGift = false;
            offerModel.GiftTexture = window.btoa(String.fromCharCode.apply(null, new Uint8Array(0)));
        } else {
            offerModel.IsGift = true;
            offerModel.GiftTexture = window.btoa(String.fromCharCode.apply(null, new Uint8Array(this.giftImage)));
        }
        offerModel.StartTime = Date.now();
        offerModel.FinishTime = Number(
            this.coreService.addHours(Date.now(), offerModel.ValidityPeriod)
        );
        offerModel.ProductList = new Array<OfferProduct>();
        this.offerProductList.forEach((v, i) => {
            offerModel.ProductList.push(v);
        });
        console.log(offerModel);
        return;
        this.remoteSettingsService.addOfferRemoteSetting(offerModel);
        this.name = null;
        this.version = null;
        this.firstPrice = null;
        this.lastPrice = null;
        this.validityPeriod = null;
        this.isGift = false;
        this.GiftImageSrc = this.pngImage;
    }

    isGiftHandler(event: boolean): void {
        this.isGift = event;
    }

    giftImageHandle(files: FileList): void {
        if (files.item(0).type !== 'image/png') {
            this.customerInformationService.showError('Please upload Png type image');
            return;
        }
        if (files.item.length > 1) {
            this.customerInformationService.showError(
                'Please just upload One Png image'
            );
            return;
        }

        this.GiftimageName = files.item(0).name;
        files
            .item(0)
            .arrayBuffer()
            .catch((err) => {
                this.customerInformationService.showError(err);
            })
            .then((value: ArrayBuffer) => {
                this.giftImage = value;
                this.GiftImageSrc = this.coreService.showImage(this.giftImage);
                this.customerInformationService.showSuccess(
                    'Image added successfully. Byte Length: ' + value.byteLength
                );
            });
    }

    productImageHandle(files: FileList): void {
        if (files.item(0).type !== 'image/png') {
            this.customerInformationService.showError('Please upload Png type image');
            return;
        }
        if (files.item.length > 1) {
            this.customerInformationService.showError(
                'Please just upload One Png image'
            );
            return;
        }

        this.PoductImageName = files.item(0).name;
        files
            .item(0)
            .arrayBuffer()
            .catch((err) => {
                this.customerInformationService.showError(err);
            })
            .then((value: ArrayBuffer) => {
                this.productImage = value;
                this.PoductImageSrc = this.coreService.showImage(this.productImage);
                this.customerInformationService.showSuccess(
                    'Image added successfully. Byte Length: ' + value.byteLength
                );
                this.customerInformationService.showInfo(
                    'Press the plus button to enrol in changes.'
                );
            });
    }

    addProduct(): void {
        const offerProduct = new OfferProduct();
        if (this.OfferStrategyFormGroup.value.ProductName === null) {
            this.customerInformationService.showError('Product name is not empty!');
            return;
        }
        if (this.OfferStrategyFormGroup.value.ProductCount === null) {
            this.customerInformationService.showError('Product count is not empty!');
            return;
        }
        if (this.productImage === null) {
            this.customerInformationService.showError('Please add product image!');
            return;
        }
        if (this.productImage.byteLength <= 0) {
            this.customerInformationService.showError('Please add product image!');
            return;
        }
        offerProduct.Image = window.btoa(String.fromCharCode.apply(null, new Uint8Array(this.productImage)));
        offerProduct.Name = this.OfferStrategyFormGroup.value.ProductName;
        offerProduct.Count = this.OfferStrategyFormGroup.value.ProductCount;
        offerProduct.ImageName = this.PoductImageName;

        this.offerProductList.push(offerProduct);
        this.offerImageLinkList.push(this.coreService.showImage(this.productImage));

        this.localStorageService.setItem(
            'productStrategy',
            JSON.stringify(this.offerProductList)
        );

        this.productImage = null;
        this.productName = null;
        this.productCount = null;
        this.OfferStrategyFormGroup.value.ProductName = null;
        this.OfferStrategyFormGroup.value.ProductCount = null;
        this.PoductImageName = 'Upload Product Image';
        this.PoductImageSrc = this.pngImage;
    }

    removeProduct(i: number): void {
        this.offerProductList.splice(i, 1);
        this.offerImageLinkList.splice(i, 1);

        this.localStorageService.setItem(
            'productStrategy',
            JSON.stringify(this.offerProductList)
        );
    }
}

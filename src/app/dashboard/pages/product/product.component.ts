import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit, OnDestroy {
    projectId: string;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}

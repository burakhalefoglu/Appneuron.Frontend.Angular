import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectManagementService} from '@app/dashboard/Services/project-management.service';
import {ProductService} from '@app/dashboard/pages/product/services/product.service';
import {ResponseModel} from '@core/models/response-model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit, OnDestroy {
    projectId: string;

    constructor(private route: ActivatedRoute,
                private productService: ProductService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                    this.projectId = params.projectId;
                }
            );
        this.productService.customerProjectisValid(this.projectId).subscribe((data) => {
            if (!data.data) {
                this.router.navigate(['/dashboard']);
            }
        });
    }

    ngOnDestroy(): void {
    }

}

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
    projectName: string;

    constructor(private route: ActivatedRoute,
                private productService: ProductService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                    this.projectName = params.projectName;
                }
            );
        this.productService.getProjectByName(this.projectName).subscribe((data) => {
            if (data.data === null) {
                this.router.navigate(['/dashboard']);
            }
        });
    }

    ngOnDestroy(): void {
    }

}

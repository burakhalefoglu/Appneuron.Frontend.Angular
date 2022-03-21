import {Injectable} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class CustomerInformationService {

    constructor(private toaster: ToastrService) {
    }

    showSuccess(message: string): void {
        this.toaster.success(message);

    }

    showWarning(message: string): void {
        this.toaster.warning(message);
    }

    showInfo(message: string): void {
        this.toaster.info(message);

    }

    showError(message: string): void {
        this.toaster.error(message);
    }
}

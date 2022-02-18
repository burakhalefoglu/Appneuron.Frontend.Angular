import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomerInformationService {
  constructor(private toastr: ToastrService) {}

  options: Partial<IndividualConfig> = {
    disableTimeOut: 'extendedTimeOut',
    timeOut: 2000,
    closeButton: true,
    newestOnTop: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    progressAnimation: 'decreasing',
    easeTime: 100,
  };

  showSuccess(message: string): void {
    this.toastr.success(message, 'Success', this.options);
  }

  showWarning(message: string): void {
    this.toastr.warning(message, 'Warning', this.options);
  }

  showInfo(message: string): void {
    this.toastr.info(message, 'Info', this.options);
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error', this.options);
  }
}

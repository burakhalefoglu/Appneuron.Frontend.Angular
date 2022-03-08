import { Component, OnInit } from '@angular/core';
import {RegisterModel} from '@auth/models/register-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '@auth/services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CoreService} from '@core/services/core.service';
import {CustomValidators} from '@auth/Helpers/CustomValidator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    registerModel: RegisterModel = new RegisterModel();
    registerAddForm: FormGroup;

    constructor(
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private coreService: CoreService
    ) {}

    registerFormEvent(): void {
        this.registerAddForm = this.formBuilder.group(
            {
                Email: new FormControl('', [Validators.required, Validators.email]),
                Password: new FormControl('', [
                    Validators.required,
                    Validators.minLength(8),
                    CustomValidators.lowercaseRequired,
                    CustomValidators.uppercaseRequired,
                    CustomValidators.numberRequired,
                ])});
    }

    ngOnInit(): void {
        this.redirectionDashboard();
        this.registerFormEvent();
    }

    private redirectionDashboard(): void {
        if (this.coreService.loggedIn()) {
            this.router.navigate(['/customerdashboard']);
        }
    }

    OpenTermsAndService(termsServiceContent: any): void {
        this.modalService.open(termsServiceContent, { scrollable: true });
    }

    add(): void {
        this.registerModel = Object.assign({}, this.registerAddForm.value);
        console.log(this.registerModel);
        this.authService.register(this.registerModel);
    }

}

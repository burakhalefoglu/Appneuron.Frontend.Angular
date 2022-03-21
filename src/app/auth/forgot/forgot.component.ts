import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CoreService} from '@app/core/services/core.service';
import {ForgotModel} from '../models/forgot-model';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss'],
    providers: [],
})
export class ForgotComponent implements OnInit {
    forgotModel: ForgotModel = new ForgotModel();
    forgotForm!: FormGroup;

    constructor(private authService: AuthService,
                private router: Router,
                private coreService: CoreService) {
    }

    createForgotFormEvent(): void {
        this.forgotForm = new FormGroup({
            Mail: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    ngOnInit(): void {
        if (this.coreService.loggedIn()) {
            this.router.navigate(['/dashboard']);
        }
        this.createForgotFormEvent();
    }

    add(): void {
        this.forgotModel = Object.assign({}, this.forgotForm.value);
        this.authService.forgot(this.forgotModel);
    }
}

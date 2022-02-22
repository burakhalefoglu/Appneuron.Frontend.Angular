import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '@app/core/services/core.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from '../Helpers/CustomValidator';
import { RegisterModel } from '../models/register-model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [],
})
export class RegisterComponent implements OnInit {
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
        ]),
        ConfirmPassword: new FormControl('', Validators.required),
        Check: new FormControl('', Validators.requiredTrue),
      },
      { validator: CustomValidators.passwordMatchValidator }
    );
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

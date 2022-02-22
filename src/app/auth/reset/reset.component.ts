import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '@app/core/services/core.service';
import { CustomValidators } from '../Helpers/CustomValidator';
import { ResetModel } from '../models/reset-model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  providers: [],
})
export class ResetComponent implements OnInit {
  token: string;
  resetFormInfo: FormGroup;
  resetModel: ResetModel = new ResetModel();
  public baseColor = '#FFF';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strength = 0;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private coreService: CoreService,
  ) {}

  RegisterFormEvent(): void {
    this.resetFormInfo = this.formBuilder.group(
      {
        Password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.lowercaseRequired,
          CustomValidators.uppercaseRequired,
          CustomValidators.numberRequired,
        ]),
        ConfirmPassword: new FormControl('', Validators.required),
      },
      { validator: CustomValidators.passwordMatchValidator }
    );
  }
  ngOnInit(): void {
    if (this.coreService.loggedIn()) {
      this.router.navigate(['/customerdashboard']);
    }
    this.route.queryParams.subscribe((params) => {
      this.token = params.resetpasswordtoken;
      this.RegisterFormEvent();
    });
  }

  add(): void {
    this.resetModel = Object.assign({}, this.resetFormInfo.value);

    this.authService.reset(this.resetModel, this.token);
  }

  strengthChanged(strength: number): void {
    this.strength = strength;
  }
}

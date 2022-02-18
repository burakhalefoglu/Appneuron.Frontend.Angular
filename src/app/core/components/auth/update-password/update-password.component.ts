import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '@auth/Helpers/CustomValidator';
import { UpdatePasswordModel } from '@app/core/components/auth/models/update-password-model';
import { AuthService } from '@app/core/components/auth/services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class UpdatePasswordComponent implements OnInit {
  updateFormGroup!: FormGroup;
  updatePasswordModel: UpdatePasswordModel = new UpdatePasswordModel();
  public baseColor = '#FFF';
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strength = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.LoginFormEvent();
  }

  LoginFormEvent(): void {
    this.updateFormGroup = this.formBuilder.group(
      {
        ValidPassword: new FormControl('', [Validators.required]),
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

  add(): void {
    this.updatePasswordModel = Object.assign({}, this.updateFormGroup.value);

    this.authService.update(this.updatePasswordModel);
  }

  strengthChanged(strength: number): void {
    this.strength = strength;
  }
}

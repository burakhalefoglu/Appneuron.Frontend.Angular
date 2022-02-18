import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotModel } from '../models/forgot-model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class ForgotComponent implements OnInit {
  forgotModel: ForgotModel = new ForgotModel();
  forgotForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  createForgotFormEvent(): void {
    this.forgotForm = new FormGroup({
      Mail: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/customerdashboard']);
    }
    this.createForgotFormEvent();
  }

  add(): void {
    this.forgotModel = Object.assign({}, this.forgotForm.value);
    this.authService.forgot(this.forgotModel);
  }
}

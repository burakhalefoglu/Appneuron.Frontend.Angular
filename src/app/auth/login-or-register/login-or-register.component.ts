import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CoreService} from '@core/services/core.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-or-register',
  templateUrl: './login-or-register.component.html',
  styleUrls: ['./login-or-register.component.scss'],
  providers: [],
})
export class LoginOrRegisterComponent implements OnInit {
    constructor(private coreService: CoreService, private router: Router) {
    }
    ngOnInit(): void {
        if (this.coreService.loggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }

}

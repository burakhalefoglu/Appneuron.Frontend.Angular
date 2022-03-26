import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CoreService } from '../services/core.service';
import {OurCookieService} from '@core/services/our-cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private coreService: CoreService,
    private router: Router,
    private ourCookieService: OurCookieService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.coreService.loggedIn()) {
      this.ourCookieService.setItem('expiration', new Date(-8640000000000000));
      this.ourCookieService.removeItem('lang');
      this.router.navigate(['/auth']);
      return false;
    } else {
      return true;
    }
  }
}

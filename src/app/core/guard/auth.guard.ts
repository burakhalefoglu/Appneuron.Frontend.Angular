import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CoreService } from '../services/core.service';
import {LocalStorageService} from '@core/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private coreService: CoreService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.coreService.loggedIn()) {
      this.localStorageService.removeItem('expiration');
      this.localStorageService.removeItem('lang');
      this.localStorageService.removeToken();
      this.router.navigate(['/auth']);
      return false;
    } else {
      return true;
    }
  }
}

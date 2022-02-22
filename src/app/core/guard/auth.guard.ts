import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CoreService } from '../services/core.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private coreService: CoreService,
    private router: Router,
    private storageService: LocalStorageService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.coreService.loggedIn()) {
      this.storageService.removeItem('token');
      this.storageService.removeItem('lang');
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}

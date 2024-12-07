import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../pages/auth/services/storage.service';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (StorageService.isAdminLoggedIn()) {
      return true;  
    }
    this.router.navigate(['/login']);
    return false;
  }
}

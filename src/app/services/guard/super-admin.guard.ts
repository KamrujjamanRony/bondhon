import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.authService.adminInfo$.pipe(
      take(1), // Ensure we only take the first emitted value
      map(admin => {
        if (admin && admin?.role.toLowerCase() === 'super-admin') {
          return true;
        } else {
          this.router.navigate(['/admin-login']);
          return false;
        }
      })
    );
  }
}

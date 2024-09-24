import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service'; // You need an AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.authService.userInfo$.pipe(
      take(1), // Ensure we only take the first emitted value
      map(user => {
        if (user) {
          return true; // Allow navigation
        } else {
          this.router.navigate(['/login']); // Redirect if not authenticated
          return false;
        }
      })
    );
  }
}

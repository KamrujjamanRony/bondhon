import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: ``
})
export class LogoutComponent {
  private authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.authService.deleteUserInfo();
    this.router.navigateByUrl('/');
    window.location.reload();
  }
}

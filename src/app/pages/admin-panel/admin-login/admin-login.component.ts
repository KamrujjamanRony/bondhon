import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputsComponent } from '../../../components/shared/inputs/inputs.component';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-admin-login',
    imports: [InputsComponent, FormsModule],
    templateUrl: './admin-login.component.html',
    styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  private adminService = inject(AdminService);
  private authService = inject(AuthService);
  router = inject(Router);
  model: any;
  error: any;
  success: any;

  constructor() {
    this.model = {
      mobileNumber: '',
      password: ''
    };
  }

  ngOnInit() { }

  onFormSubmit() {
    const {
      mobileNumber,
      password
    } = this.model;
    if (mobileNumber && password) {
      this.adminService.loginAdmin(mobileNumber, password)
        .subscribe({
          next: (response) => {
            console.log(response)
            if (response) {
              this.authService.setAdminInfo(response)
              this.success = 'Admin login successfully';
              this.router.navigateByUrl('admin-panel/user-list');
              setTimeout(() => {
                this.success = null;
              }, 1500);
            } else {
              this.error = 'Please Fill mobileNumber and password correctly';
              setTimeout(() => {
                this.error = null;
              }, 3000);
            }

          },
          error: (error) => {
            console.error('Error login:', error);
          }
        });
    } else {
      this.error = 'Please Fill mobileNumber and password field';
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }

}

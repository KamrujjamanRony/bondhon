import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [InputsComponent, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  private adminService = inject(AdminService);
  private authService = inject(AuthService);
  router = inject(Router);
  model : any;
  error : any;
  success : any;

  constructor() {
    this.model = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {}

  onFormSubmit(){
    const {
      username,
      password
    } = this.model;
    if (username && password) {
      this.adminService.getAdmin(username, password)
      .subscribe({
        next: (response) => {
          console.log(response)
          if (response[0]) {
            this.authService.setAdminInfo(response[0])
            this.success = 'Admin login successfully';
            setTimeout(() => {
              this.router.navigateByUrl('/admin-panel');
            }, 1500);
          } else {
            this.error = 'Please Fill username and password correctly';
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
      this.error = 'Please Fill username and password field';
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }

}

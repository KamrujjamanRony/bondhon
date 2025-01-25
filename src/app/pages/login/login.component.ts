import { Component, inject, signal } from '@angular/core';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SubBannerComponent } from "../../components/home/sub-banner/sub-banner.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputsComponent, FormsModule, SubBannerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  router = inject(Router);
  model: any;
  error = signal<any>(null);
  success = signal<any>(null);

  constructor() {
    this.model = {
      mobileNumber: '',
      password: '',
    };
  }

  ngOnInit() { }

  onFormSubmit() {
    const { mobileNumber, password } = this.model;
    if (mobileNumber && password) {
      this.userService.loginUser(this.model)
        .subscribe({
          next: (response: any) => {
            console.log(response)
            if (response) {
              console.log(response)
              this.authService.setUserInfo(response)
              this.success.set('User login successfully');
              setTimeout(() => {
                this.router.navigateByUrl('/');
              }, 1500);
            } else {
              this.error.set('Mobile Number or Password is Incorrect!');
              setTimeout(() => {
                this.error.set(null);
              }, 1500);
            }

          },
          error: (error) => {
            console.error('Error login:', error);
            this.error.set(error?.error?.message);
            setTimeout(() => {
              this.error.set(null);
            }, 1500);
          }
        });
    } else {
      this.error.set('Mobile Number and Password is Required!');
      setTimeout(() => {
        this.error.set(null);
      }, 1500);
    }
  }

}

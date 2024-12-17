import { Component, inject } from '@angular/core';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputsComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  router = inject(Router);
  model : any;
  error : any;
  success : any;

  constructor() {
    this.model = {
      mobileNumber: ''
    };
  }

  ngOnInit() {}

  onFormSubmit(){
    const { mobileNumber } = this.model;
    if (mobileNumber) {
      this.userService.getUser(mobileNumber)
      .subscribe({
        next: (response) => {
          console.log(response)
          if (response[0]) {
            this.authService.setUserInfo(response[0])
            this.success = 'User login successfully';
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 1500);
          } else {
            this.error = 'Mobile Number is Incorrect!';
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
      this.error = 'Mobile Number is Required!';
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }

}

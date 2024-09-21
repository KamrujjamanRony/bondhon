import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account-update',
  standalone: true,
  imports: [InputsComponent, FormsModule],
  templateUrl: './account-update.component.html',
  styleUrl: './account-update.component.css'
})
export class AccountUpdateComponent {
  private dataService = inject(DataService);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  model : any;
  userData : any;
  divisions : any;
  districts : any;
  bloodGroups : any;
  occupation : any;
  error : any;
  success : any;

  constructor() {
    this.model = {
      division: '',
      district: '',
      name: '',
      phone: '',
      lastDateOfDonate: '',
      password: '',
      bloodGroup: '',
      occupation: '',
      college: '',
      describe: ''
    };
  }

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {
      this.divisions = data?.divisions;
      this.bloodGroups = data?.bloodGroups;
      this.occupation = data?.occupation;
    });
    this.authService.userInfo$.subscribe((user) => {
      this.model = user;
      this.onDivisionChanged();
      this.userService.getUser(user.phone, user.password).subscribe((data) =>{
        this.userData = data[0] || user;
      });
    });
  }

  onFormSubmit(){
    const {
      division,
      district,
      name,
      phone,
      lastDateOfDonate,
      password,
      bloodGroup,
      occupation,
      college,
      describe
    } = this.model;
    if (division && district && name && phone && password && bloodGroup && occupation) {
      const userInfo = {
        division,
        district,
        name,
        phone,
        lastDateOfDonate,
        password,
        bloodGroup,
        occupation,
        college,
        describe
      };
      this.userService.updateUser( this.userData.id, userInfo)
      .subscribe({
        next: (response) => {
          this.success = 'Profile update successfully';
          this.authService.updateUserInfo( userInfo );
          setTimeout(() => {
            this.success = null;
          }, 3000);
        },
        error: (error) => {
          console.error('Error update:', error);
        }
      });
    } else {
      this.error = 'Please Fill all the required fields'
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }

  onDivisionChanged(){
    this.dataService.getCityByParentId(this.model.division).subscribe(
      data => {
        this.districts = data;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

}

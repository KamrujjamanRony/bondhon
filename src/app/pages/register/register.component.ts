import { Component, inject } from '@angular/core';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputsComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private dataService = inject(DataService);
  private userService = inject(UserService);
  router = inject(Router);
  model : any;
  divisions : any;
  districts : any;
  bloodGroups : any;
  occupation : any;
  conditions : any;
  gender : any;
  error : any;
  success : any;
  isDisable : boolean = true;
  // passwordMismatch: boolean = false;

  constructor() {
    this.model = {
      division: '',
      district: '',
      name: '',
      phone: '',
      gender: '',
      lastDateOfDonate: '',
      password: '',
      rePassword: '',
      bloodGroup: '',
      occupation: '',
      college: '',
      describe: '',
      conditions: ''
    };
  }

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {
      this.divisions = data?.divisions;
      this.bloodGroups = data?.bloodGroups;
      this.occupation = data?.occupation;
      this.gender = data?.gender;
      this.conditions = data?.conditions;
    });
  }

  onFormSubmit(){
    // if (this.passwordMismatch) {
    //   this.error = 'Passwords do not match';
    //   return;
    // }
    const {
      division,
      district,
      name,
      phone,
      gender,
      lastDateOfDonate,
      bloodGroup,
      occupation,
      college,
      describe
    } = this.model;
    if (division && district && name && phone && bloodGroup && occupation) {
      const userInfo = {
        division,
        district,
        name,
        phone,
        gender,
        lastDateOfDonate,
        bloodGroup,
        occupation,
        college,
        describe,
        role: 'user'
      };
      this.userService.addUser(userInfo)
      .subscribe({
        next: (response) => {
          this.success = 'User registered successfully';
          setTimeout(() => {
            this.success = null;
          }, 3000);
          this.router.navigateByUrl('login');
        },
        error: (error) => {
          console.error('Error register:', error);
        }
      });
    } else {
      this.error = 'Please Fill all the required fields'
      setTimeout(() => {
        this.error = null;
      }, 3000);
    }
  }

  // checkPasswordMatch() {
  //   this.error = '';
  //   this.passwordMismatch = this.model.password !== this.model.rePassword;
  //   if (this.passwordMismatch) {
  //     this.error = 'Passwords do not match';
  //   }
  //   console.log(this.passwordMismatch);
  // }

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

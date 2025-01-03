import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ThanaService } from '../../services/thana.service';

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
  private thanaService = inject(ThanaService);
  router = inject(Router);
  model: any;
  divisions = signal<any>([]);
  districts = signal<any>([]);
  thana = signal<any>([]);
  bloodGroups: any;
  occupation: any;
  conditions: any;
  gender: any;
  error: any;
  success: any;
  isDisable: boolean = true;

  constructor() {
    this.model = {
      division: '',
      thana: '',
      name: '',
      mobileNumber: '',
      gender: '',
      dob: '',
      lastDoneteDate: '',
      password: '',
      rePassword: '',
      bloodGroup: '',
      occupation: '',
      college: '',
      others: '',
      isAgree: false,
      postedBy: '',
      entryDate: new Date()
    };
  }

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {
      this.divisions.set(data?.divisions);
      this.bloodGroups = data?.bloodGroups;
      this.occupation = data?.occupation;
      this.gender = data?.gender;
      this.conditions = data?.conditions;
    });
  }

  onFormSubmit() {
    // if (this.passwordMismatch) {
    //   this.error = 'Passwords do not match';
    //   return;
    // }
    const {
      division,
      thana,
      name,
      mobileNumber,
      gender,
      dob,
      lastDoneteDate,
      bloodGroup,
      occupation,
      college,
      isAgree,
      others,
      entryDate
    } = this.model;
    if (division && thana && name && mobileNumber && bloodGroup && occupation) {
      const userInfo = {
        division,
        thana,
        name,
        mobileNumber,
        gender,
        dob,
        lastDoneteDate,
        bloodGroup,
        occupation,
        college,
        others,
        isAgree: true,
        postedBy: 'user',
        entryDate
      };
      console.log(userInfo)
      this.userService.addUser(userInfo)
        .subscribe({
          next: (response) => {
            console.log(response)
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

  onDivisionChanged() {
    this.dataService.getCityByParentId(this.model.division).subscribe(
      data => {
        this.districts.set(data);
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  onDistrictChanged() {
    this.thanaService.getThana({
      "Search": this.model.district
    }).subscribe(data => {
      this.thana.set(data);
    })
  }
}

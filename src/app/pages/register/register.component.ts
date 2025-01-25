import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ThanaService } from '../../services/thana.service';

@Component({
    selector: 'app-register',
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
  error = signal<any>(null);
  success = signal<any>(null);
  isDisable = signal<boolean>(false);
  passwordMismatch = signal<boolean>(false);

  constructor() {
    this.model = {
      division: '',
      district: '',
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
    this.checkPasswordMatch();
    if (this.passwordMismatch()) {
      return;
    }
    const {
      division,
      district,
      thana,
      fullAddress,
      name,
      mobileNumber,
      password,
      gender,
      dob,
      lastDoneteDate,
      bloodGroup,
      occupation,
      college,
      others,
      entryDate
    } = this.model;
    if (division && district && thana && name && mobileNumber && gender && dob && bloodGroup && occupation) {
      if (mobileNumber.length < 11) {
        this.error.set('Mobile number must be at least 11 characters!');
        setTimeout(() => {
          this.error.set(null);
        }, 1000);
        return;
      }
      const userInfo = {
        division,
        district,
        thana,
        fullAddress,
        name,
        mobileNumber,
        password,
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
            this.success.set('User registered successfully');
            setTimeout(() => {
              this.success.set(null);
            }, 1000);
            this.router.navigateByUrl('login');
          },
          error: (error) => {
            this.error.set(error.error.message);
            console.error('Error register:', error.error);
          }
        });
    } else {
      this.error.set('Please Fill all the required fields');
      setTimeout(() => {
        this.error.set(null);
      }, 1000);
    }
  }

  checkPasswordMatch() {
    this.error.set('');
    this.passwordMismatch.set(this.model.password !== this.model.rePassword);
    if (this.passwordMismatch()) {
      this.error.set('Passwords do not match');
    }
    console.log(this.passwordMismatch);
  }

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
      "Search": this.model.district,
      "division": ""
    }).subscribe(data => {
      this.thana.set(data);
    })
  }
}

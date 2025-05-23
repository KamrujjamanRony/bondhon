import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InputsComponent } from '../../../components/shared/inputs/inputs.component';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { ThanaService } from '../../../services/thana.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, InputsComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  private userService = inject(UserService);
  private dataService = inject(DataService);
  private thanaService = inject(ThanaService);
  private authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  id: any = null;
  model?: any;
  admin?: any;
  divisions = signal<any>([]);
  districts = signal<any>([]);
  thana = signal<any>([]);
  bloodGroups = signal<any>([]);
  postPersons = signal<any>([]);
  occupation: any;
  conditions: any;
  gender: any;
  todayDate: any;
  paramsSubscription?: Subscription;
  UserSubscription?: Subscription;
  error = signal<any>(null);
  success = signal<any>(null);
  loading = signal<boolean>(false);
  passwordMismatch = signal<boolean>(false);

  constructor() {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
    this.onReset();
  }

  ngOnInit(): void {
    this.model.postedBy = this.authService.getAdminInfo()?.name;
    this.dataService.getJsonData().subscribe(data => {
      this.divisions.set(data?.divisions);
      this.bloodGroups.set(data?.bloodGroups);
      this.occupation = data?.occupation;
      this.gender = data?.gender;
      this.conditions = data?.conditions;
    });
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.userService.getUser('', '', '', '', '', '', '', '', this.id)
            .subscribe({
              next: (response) => {
                console.log(response)
                if (response) {
                  this.model = { ...response[0], password: "", dob: response[0]?.dob?.split("T")[0], lastDoneteDate: response[0]?.lastDoneteDate?.split("T")[0] };
                  this.onDivisionChanged();
                  this.onDistrictChanged();
                }
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {
    const {
      division,
      district,
      thana,
      name,
      mobileNumber,
      gender,
      dob,
      bloodGroup,
      occupation,
      password,
    } = this.model;
    if (mobileNumber.length < 11) {
      this.error.set('Mobile number must be at least 11 characters!');
      setTimeout(() => {
        this.error.set(null);
      }, 1500);
      return;
    }



    if (this.id) {
      if (division && district && thana && name && mobileNumber && gender && dob && bloodGroup && occupation) {
        this.UserSubscription = this.userService.updateUser(this.id, this.model)
          .subscribe({
            next: (response) => {
              this.success.set('User Update successfully');
              this.onReset();
              this.id = null;
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
                // this.router.navigateByUrl('/admin-panel/user-list');
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Update User:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      } else {
        this.error.set('Please Fill all the required fields')
        setTimeout(() => {
          this.error.set(null);
          this.loading.set(false);
        }, 1500);
      }



    } else {
      if (division && district && thana && name && mobileNumber && gender && dob && bloodGroup && occupation && password) {
        console.log(this.model)
        this.UserSubscription = this.userService.addUser(this.model)
          .subscribe({
            next: (response) => {
              this.success.set('User Add successfully');
              this.onReset();
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
              }, 1500);
              // this.router.navigateByUrl('/admin-panel/user-list');
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Add User:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      } else {
        this.error.set('Please Fill all the required fields')
        setTimeout(() => {
          this.error.set(null);
          this.loading.set(false);
        }, 1500);
      }

    }

  };

  checkPasswordMatch() {
    this.error.set('');
    this.passwordMismatch.set(this.model.password !== this.model.rePassword);
    if (this.passwordMismatch()) {
      this.error.set('Passwords do not match');
    }
    console.log(this.passwordMismatch);
  }

  onReset() {
    this.model = {
      name: "",
      mobileNumber: "",
      gender: "",
      division: "",
      district: "",
      thana: "",
      bloodGroup: "",
      occupation: "",
      dob: "",
      college: "",
      lastDoneteDate: "",
      entryDate: this.todayDate,
      isAgree: "",
      fullAddress: "",
      others: "",
      password: "",
      postedBy: "",
    };
  }

  // closeModal() {
  //   this.confirmModal = false;
  // }

  onDivisionChanged() {
    this.dataService.getCityByParentId(this.model.division).subscribe(
      data => {
        this.districts.set(data);
        // this.cdr.detectChanges();
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

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.UserSubscription?.unsubscribe();
  }

}

import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThanaService } from '../../services/thana.service';
import { DatePipe } from '@angular/common';

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
  private thanaService = inject(ThanaService);
  model: any;
  userData = signal<any>(null);
  divisions = signal<any>([]);
  districts = signal<any>([]);
  thana = signal<any>([]);
  bloodGroups: any;
  occupation: any;
  error: any;
  success: any;
  gender: any;

  constructor() {
    this.model = {
      division: '',
      district: '',
      thana: '',
      name: '',
      mobileNumber: '',
      gender: '',
      dob: "",
      lastDoneteDate: '',
      fullAddress: '',
      bloodGroup: '',
      occupation: '',
      college: '',
      isAgree: true,
      others: '',
      postedBy: '',
      password: '',
      entryDate: ""
    };
  }

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {
      this.divisions.set(data?.divisions);
      this.bloodGroups = data?.bloodGroups;
      this.occupation = data?.occupation;
      this.gender = data?.gender;
    });
    this.authService.userInfo$.subscribe((user) => {
      const updateUser = { ...user, dob: user?.dob?.split('T')[0] }
      this.model = updateUser;
      this.userData.set(updateUser)
      this.onDivisionChanged();
      this.onDistrictChanged();
    });

  }

  onFormSubmit() {
    const {
      division,
      district,
      thana,
      name,
      mobileNumber,
      gender,
      dob,
      lastDoneteDate,
      fullAddress,
      bloodGroup,
      occupation,
      isAgree,
      postedBy,
      entryDate,
      college,
      password,
      others
    } = this.model;
    if (division && district && thana && name && mobileNumber && gender && dob && entryDate && postedBy && bloodGroup && occupation) {
      if (mobileNumber.length < 11) {
        this.error = 'Mobile number must be at least 11 characters!';
        setTimeout(() => {
          this.error = null;
        }, 1500);
        return;
      }
      const userInfo = {
        division,
        district,
        thana,
        name,
        mobileNumber,
        gender,
        dob,
        lastDoneteDate,
        fullAddress,
        isAgree,
        postedBy,
        entryDate,
        bloodGroup,
        occupation,
        college,
        password,
        others
      };
      this.userService.updateUser(this.userData().gid, userInfo)
        .subscribe({
          next: (response) => {
            this.success = 'Profile update successfully';
            this.authService.updateUserInfo(userInfo);
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

  onDivisionChanged() {
    this.dataService.getCityByParentId(this.model.division).subscribe(
      data => {
        this.districts.set(data);
      },
      error => {
        console.error('Error fetching districts', error);
      }
    );
  }

  onDistrictChanged() {
    this.thanaService.getThana({
      "Search": this.model.district,
      "division": ""
    }).subscribe(
      data => {
        this.thana.set(data);
      },
      error => {
        console.error('Error fetching thana', error);
      })
  }

  transform(value: any, args: any = 'dd/MM/yyyy'): any {
    if (!value) return null;
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, args);
  }

}

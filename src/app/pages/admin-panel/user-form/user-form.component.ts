import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from '../../../components/shared/confirm-modal/confirm-modal.component';
import { InputsComponent } from '../../../components/shared/inputs/inputs.component';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { ThanaService } from '../../../services/thana.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ConfirmModalComponent, FormsModule, InputsComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  private userService = inject(UserService);
  private dataService = inject(DataService);
  private thanaService = inject(ThanaService);
  route = inject(ActivatedRoute);
  id: any = null;
  model?: any;
  divisions: any;
  districts: any;
  thana: any;
  bloodGroups: any;
  occupation: any;
  conditions: any;
  gender: any;
  todayDate: any;
  confirmModal: boolean = false;
  paramsSubscription?: Subscription;
  UserSubscription?: Subscription;

  constructor() {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
    this.onReset();
  }

  ngOnInit(): void {
    this.dataService.getJsonData().subscribe(data => {
      this.divisions = data?.divisions;
      this.bloodGroups = data?.bloodGroups;
      this.occupation = data?.occupation;
      this.gender = data?.gender;
      this.conditions = data?.conditions;
    });
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.userService.getUser('', '', '', '', '', '', '', this.id)
            .subscribe({
              next: (response) => {
                console.log(response)
                if (response) {
                  this.model = response[0];
                }
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {

    if (this.id) {
      this.UserSubscription = this.userService.updateUser(this.id, this.model)
        .subscribe({
          next: (response) => {
            this.confirmModal = true;
          }
        });
    } else {
      console.log(this.model)
      this.UserSubscription = this.userService.addUser(this.model)
        .subscribe({
          next: (response) => {
            this.confirmModal = true;
          }
        });
    }
  };

  onReset() {
    this.model = {
      name: "",
      mobileNumber: "",
      gender: "",
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
      division: "",
      district: "",
      postedBy: "",
    };
  }

  closeModal() {
    this.confirmModal = false;
  }

  onDivisionChanged() {
    this.dataService.getCityByParentId(this.model.division).subscribe(
      data => {
        this.districts = data;
        // this.cdr.detectChanges();
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
      this.thana = data;
    })
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.UserSubscription?.unsubscribe();
  }

}

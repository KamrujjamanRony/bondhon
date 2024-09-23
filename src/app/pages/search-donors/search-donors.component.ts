import { Component, inject } from '@angular/core';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { UserCardComponent } from "../../components/shared/user-card/user-card.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search-donors',
  standalone: true,
  imports: [InputsComponent, FormsModule, UserCardComponent],
  templateUrl: './search-donors.component.html',
  styleUrl: './search-donors.component.css'
})
export class SearchDonorsComponent {
  private dataService = inject(DataService);
  private userService = inject(UserService);

  model: any;
  divisions: any;
  districts: any;
  bloodGroups: any;
  users: any;
  allUsers: any;

  constructor() {
    this.model = {
      division: '',
      district: '',
      date: '',
      bloodGroup: ''
    };
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.allUsers = data;
      this.users = this.allUsers;
      console.log(this.users)
    });
    this.dataService.getJsonData().subscribe(data => {
      this.divisions = data?.divisions;
      this.bloodGroups = data?.bloodGroups;
    });
  }

  onFormSubmit() {
    const {
      division,
      district,
      date,
      bloodGroup
    } = this.model;

    // Convert the date from the form into a Date object
    const formDate = new Date(date);

    // Filter users based on district, bloodGroup, and 4-month gap between donation dates
    this.users = this.allUsers.filter((data: any) => {
      const donateDate = data?.lastDateOfDonate ? new Date(data?.lastDateOfDonate) : null;

      let isDateGapValid;

      // If lastDateOfDonate is not available, the user is eligible to donate
      if (!donateDate) {
        isDateGapValid = true;
      } else {
        // Calculate the year and month difference
        let yearDiff = formDate.getFullYear() - donateDate.getFullYear();
        let monthDiff = formDate.getMonth() - donateDate.getMonth();

        // Adjust month difference to be consistent across years
        let totalMonthDiff = yearDiff * 12 + monthDiff;

        // Check if the gap is at least 4 months, and handle exact days of the month
        if (totalMonthDiff === 4 && formDate.getDate() < donateDate.getDate()) {
          totalMonthDiff--;  // If the day of formDate is earlier in the month, reduce the month difference
        }

        isDateGapValid = totalMonthDiff >= 4;
      }

      return data.district === district &&
        data.bloodGroup === bloodGroup &&
        isDateGapValid;
    });
  }


  onDivisionChanged() {
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

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
      this.allUsers = data.filter(user => user.role === 'user');
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
  
    // Filter users based on individual conditions
    this.users = this.allUsers.filter((data: any) => {
      const donateDate = data?.lastDateOfDonate ? new Date(data?.lastDateOfDonate) : null;
  
      // Check if date gap is valid (4-month rule)
      let isDateGapValid = true;  // By default, if no lastDateOfDonate is provided, it's valid
      if (donateDate) {
        let yearDiff = formDate.getFullYear() - donateDate.getFullYear();
        let monthDiff = formDate.getMonth() - donateDate.getMonth();
        let totalMonthDiff = yearDiff * 12 + monthDiff;
  
        // Handle exact day of the month comparison
        if (totalMonthDiff === 4 && formDate.getDate() < donateDate.getDate()) {
          totalMonthDiff--;
        }
  
        isDateGapValid = totalMonthDiff >= 4;
      }
  
      // Check each condition individually
      const matchesDivision = division ? data.division === division : true;
      const matchesDistrict = district ? data.district === district : true;
      const matchesBloodGroup = bloodGroup ? data.bloodGroup === bloodGroup : true;
      const matchesDateGap = isDateGapValid;
  
      // Return user if any of the conditions are met
      return matchesDivision && matchesDistrict && matchesBloodGroup && matchesDateGap;
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

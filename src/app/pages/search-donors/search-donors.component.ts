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
      thana: '',
      date: '',
      TodayOrBack3Month: '',
      BloodGroup: ''
    };
  }

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {
      this.divisions = data?.divisions;
      this.bloodGroups = data?.bloodGroups;
    });
  }

  onFormSubmit() {
    const {
      division,
      thana,
      TodayOrBack3Month,
      BloodGroup
    } = this.model;

    if (division && thana && TodayOrBack3Month && BloodGroup) {
      // Encode the parameters properly
      const encodedDivision = encodeURIComponent(division);
      const encodedThana = encodeURIComponent(thana);
      const encodedDate = encodeURIComponent(TodayOrBack3Month);
      this.userService.searchUsers(encodedDivision, encodedThana, BloodGroup, encodedDate).subscribe(data => {
        this.allUsers = data;
        this.users = this.allUsers;
      });
    }
    
  }

  // Method to subtract 4 months from a given date
  calculateMinusFourMonths(dateInput: string): string {
    if (!dateInput) return '';

    const date = new Date(dateInput);
    date.setMonth(date.getMonth() - 4);

    // Format the date as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  }

  // Example method to handle the date change
  onDateChange(): void {
    this.model.TodayOrBack3Month = this.calculateMinusFourMonths(this.model.date);
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

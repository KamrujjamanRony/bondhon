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

  model : any;
  divisions : any;
  districts : any;
  bloodGroups : any;
  users : any;

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
      this.users = data;
      console.log(this.users)
    });
    this.dataService.getJsonData().subscribe(data => {
      this.divisions = data?.divisions;
      this.bloodGroups = data?.bloodGroups;
    });
  }

  onFormSubmit(){
    const {
      division,
      district,
      date,
      bloodGroup
    } = this.model;
      const userInfo = {
        division,
        district,
        date,
        bloodGroup
      };
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

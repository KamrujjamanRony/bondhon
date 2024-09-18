import { Component, inject } from '@angular/core';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
  model : any;
  divisions : any;
  districts : any;
  bloodGroups : any;
  occupation : any;

  constructor() {
    this.model = {
      division: '',
      district: '',
      name: '',
      phone: '',
      lastDateOfDonate: '',
      password: '',
      bloodGroup: '',
      occupation: '',
      college: '',
      describe: ''
    };
  }

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {
      this.divisions = data?.divisions;
      this.bloodGroups = data?.bloodGroups;
      this.occupation = data?.occupation;
    });
  }

  onFormSubmit(){
    console.log(this.model)
    if (this.model.division && this.model.districts && this.model.name && this.model.phone && this.model.password && this.model.bloodGroup && this.model.occupation) {
      const userInfo = {
        id: crypto.randomUUID(),
        division: this.model.division,
        district: this.model.district,
        name: this.model.name,
        phone: this.model.phone,
        lastDateOfDonate: this.model.lastDateOfDonate,
        password: this.model.password,
        bloodGroup: this.model.bloodGroup,
        occupation: this.model.occupation,
        college: this.model.college,
        describe: this.model.describe
      };
      this.userService.addUser(userInfo)
      .subscribe({
        next: (response) => {
            console.log(response)
        },
        error: (error) => {
            console.error('Error register:', error);
        }
    });
    }
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

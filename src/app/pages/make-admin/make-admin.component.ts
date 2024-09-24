import { Component, inject } from '@angular/core';
import { CoverComponent } from "../../components/shared/cover/cover.component";
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";

@Component({
  selector: 'app-make-admin',
  standalone: true,
  imports: [CoverComponent, InputsComponent],
  templateUrl: './make-admin.component.html',
  styleUrl: './make-admin.component.css'
})
export class MakeAdminComponent {
  private userService = inject(UserService);
  private dataService = inject(DataService);
  
  filterUsers: any;
  users: any;
  roles: any;
  selectedRole: any = '';
  success: any = '';

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.filterUsers = data;
      this.users = this.filterUsers;
    });
    this.dataService.getJsonData().subscribe(data => {
      this.roles = data?.role;
    });
  }

  onRoleValueUpdate(role: any){
    this.selectedRole = role
  }
  onRoleChanged(data: any){
    console.log(data);
    const updated = {...data, role: this.selectedRole};
    this.userService.updateUser( data.id, updated)
      .subscribe({
        next: (response) => {
          this.success = 'Role update successfully';
          setTimeout(() => {
            this.success = null;
          }, 3000);
        },
        error: (error) => {
          console.error('Error update:', error);
        }
      });
  }

}

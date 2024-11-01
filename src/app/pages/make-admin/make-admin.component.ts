import { Component, inject } from '@angular/core';
import { CoverComponent } from "../../components/shared/cover/cover.component";
import { DataService } from '../../services/data.service';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-make-admin',
  standalone: true,
  imports: [CoverComponent, InputsComponent],
  templateUrl: './make-admin.component.html',
  styleUrl: './make-admin.component.css'
})
export class MakeAdminComponent {
  private adminService = inject(AdminService);
  private dataService = inject(DataService);
  
  filterAdmins: any;
  Admins: any;
  roles: any;
  selectedRole: any = '';
  success: any = '';

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe(data => {
      this.filterAdmins = data;
      this.Admins = this.filterAdmins;
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
    this.adminService.updateAdmin( data.id, updated)
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

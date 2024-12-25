import { Component, inject } from '@angular/core';
import { CoverComponent } from "../../components/shared/cover/cover.component";
import { DataService } from '../../services/data.service';
import { InputsComponent } from "../../components/shared/inputs/inputs.component";
import { AdminService } from '../../services/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-make-admin',
  standalone: true,
  imports: [CoverComponent, InputsComponent, RouterLink],
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
  onDelete(arg0: any) {
  throw new Error('Method not implemented.');
  }
  onUpdate(_t17: any) {
  throw new Error('Method not implemented.');
  }

}

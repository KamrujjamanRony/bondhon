import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoverComponent } from '../../../components/shared/cover/cover.component';
import { AdminService } from '../../../services/admin.service';
import { DataService } from '../../../services/data.service';

@Component({
    selector: 'app-make-admin',
    imports: [CoverComponent, RouterLink],
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
    this.adminService.getAdmin("").subscribe(data => {
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

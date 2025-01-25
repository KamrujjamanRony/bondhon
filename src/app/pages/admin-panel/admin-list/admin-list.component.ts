import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoverComponent } from '../../../components/shared/cover/cover.component';
import { AdminService } from '../../../services/admin.service';
import { DataService } from '../../../services/data.service';

@Component({
    selector: 'app-admin-list',
    imports: [CoverComponent, RouterLink],
    templateUrl: './admin-list.component.html',
    styleUrl: './admin-list.component.css'
})
export class AdminListComponent {
  private adminService = inject(AdminService);
  private dataService = inject(DataService);

  filterAdmins = signal<any>([]);
  roles: any;
  selectedRole: any = '';
  success = signal<any>("");

  ngOnInit(): void {
    this.adminService.getAdmin("").subscribe(data => {
      this.filterAdmins.set(data);
    });
    this.dataService.getJsonData().subscribe(data => {
      this.roles = data?.role;
    });
  }
  onDelete(id: any) {
    if (confirm("Are you sure you want to delete?")) {
      this.adminService.deleteAdmin(id).subscribe(data => {
        if (data.gid) {
          this.success.set("Admin deleted successfully!");
          this.filterAdmins.set(this.filterAdmins().filter((a: any) => a.gid !== data.gid));
          setTimeout(() => {
            this.success.set("");
          }, 2000);
        } else {
          console.error('Error deleting Admin:', data);
          alert('Error deleting Admin: ' + data.message)
        }
      });
    };
  }

}

import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';
import { RouterLink } from '@angular/router';
import { CoverComponent } from '../../components/shared/cover/cover.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, CoverComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  private userService = inject(UserService);
  private dataService = inject(DataService);
  users?: any;

  constructor() { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      this.users = data;
    })
  }

  onDelete(id: any): void {
    if (confirm("Are you sure you want to delete?")) {
      this.userService.deleteUser(id).subscribe(data => {
        if (data.id) {
          this.users = this.users.filter((d: any) => d.id !== id);
          alert("User deleted successfully!");
        } else {
          console.error('Error deleting User:', data);
        }
      });
    }
  }

  transform(value: any, args: any = 'dd/MM/yyyy'): any {
    if (!value) return null;
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, args);
  }

}

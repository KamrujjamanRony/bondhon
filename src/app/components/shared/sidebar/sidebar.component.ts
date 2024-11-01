import { Observable } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  about!: any;
  address!: any;
  constructor() { }
  ngOnInit(): void {}

  // Method to handle logout
  logout() {
    this.authService.deleteAdminInfo();
  }

}

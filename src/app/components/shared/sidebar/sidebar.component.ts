import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AboutService } from '../../../services/about.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthService);
  private aboutService = inject(AboutService);
  aboutId!: any;
  role!: any;
  ngOnInit(): void {
    this.role = this.authService.getAdminInfo()?.role;
    this.aboutService.getAllAbout().subscribe(aboutUs => {
      if (aboutUs) {
        const about = aboutUs.find(a => a.companyID.toString() === this.aboutService.companyCode);
        this.aboutId = about?.id;
      }
    });
  }

  // Method to handle logout
  logout() {
    this.authService.deleteAdminInfo();
  }

}

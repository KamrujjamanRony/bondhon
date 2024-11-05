import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private authService = inject(AuthService);
  user: any;
  menuItems: any;

  constructor() {
    // Subscribe to changes in login status
    this.authService.userInfo$.subscribe((user) => {
      this.user = user;
      this.updateMenuItems();
    });
  }

  // Method to update menu items based on user status
  updateMenuItems() {
    this.menuItems = this.user ?
      [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'About',
          link: '/about'
        },
        {
          label: 'Gallery',
          link: '/gallery'
        },
        {
          label: 'Search Donors',
          link: '/search-donors'
        },
        // {
        //   label: 'Blood Request',
        //   link: '/blood-request'
        // },
        {
          label: 'Account',
          subItems: [
            {
              label: 'Update',
              link: '/account-update'
            },
            {
              label: 'Logout',
              action: () => this.logout()
            }
          ]
        },
      ]
      : [
        {
          label: 'Home',
          link: '/'
        },
        {
          label: 'About',
          link: '/about'
        },
        {
          label: 'Gallery',
          link: '/gallery'
        },
        {
          label: 'Search Donors',
          link: '/search-donors'
        },
        // {
        //   label: 'Blood Request',
        //   link: '/blood-request'
        // },
        {
          label: 'Register',
          link: '/register'
        },
        {
          label: 'Login',
          link: '/login'
        },
      ];
  }

  // Method to handle logout and update menu items
  logout() {
    this.authService.deleteUserInfo();
  }
}

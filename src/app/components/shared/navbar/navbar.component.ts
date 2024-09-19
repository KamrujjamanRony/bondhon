import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  user: any;
  menuItems: any;

  ngOnInit() {
    this.user = this.authService.getUserInfo();
    console.log(this.user)
  }

  constructor(){
    this.user = this.authService.getUserInfo();
    this.menuItems = this.user ? [
      {
        label: 'Home',
        link: '/'
      },
      {
        label: 'About',
        link: '/about'
      },
      {
        label: 'Search Donors',
        link: '/search-donors'
      },
      {
        label: 'Blood Request',
        link: '/blood-request'
      },
      {
        label: 'Register',
        link: '/register'
      },
      {
        label: 'Account',
        subItems: [
          {
            label: 'Update',
            link: '/account-update'
          },
          {
            label: 'Logout',
            link: '/logout'
          }
        ]
      },
    ] : [
      {
        label: 'Home',
        link: '/'
      },
      {
        label: 'About',
        link: '/about'
      },
      {
        label: 'Search Donors',
        link: '/search-donors'
      },
      {
        label: 'Blood Request',
        link: '/blood-request'
      },
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

}

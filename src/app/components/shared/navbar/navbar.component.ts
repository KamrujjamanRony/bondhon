import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuItems = [
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

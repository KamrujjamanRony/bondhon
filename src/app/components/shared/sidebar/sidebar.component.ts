import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class SidebarComponent implements OnInit {
  about!: any;
  address!: any;
  constructor() { }
  ngOnInit(): void {}

}

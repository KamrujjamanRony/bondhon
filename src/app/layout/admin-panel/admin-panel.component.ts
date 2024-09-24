import { Component, inject } from '@angular/core';
import { SidebarComponent } from "../../components/shared/sidebar/sidebar.component";
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

  ngOnInit() {}

}

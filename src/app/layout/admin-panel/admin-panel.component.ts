import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/shared/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin-panel',
    imports: [SidebarComponent, RouterOutlet],
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}

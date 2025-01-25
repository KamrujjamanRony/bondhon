import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-main',
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css'
})
export class MainComponent {

}

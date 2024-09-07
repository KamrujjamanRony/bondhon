import { Component } from '@angular/core';
import { BannerComponent } from "../../components/home/banner/banner.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

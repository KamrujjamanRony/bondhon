import { Component } from '@angular/core';
import { BannerComponent } from "../../components/home/banner/banner.component";
import { CountdownComponent } from "../../components/home/countdown/countdown.component";
import { IntroComponent } from "../../components/home/intro/intro.component";
import { SubBannerComponent } from "../../components/home/sub-banner/sub-banner.component";
import { OurServicesComponent } from "../../components/home/our-services/our-services.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, CountdownComponent, IntroComponent, SubBannerComponent, OurServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
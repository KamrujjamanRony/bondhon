import { Component } from '@angular/core';
import { CoverComponent } from "../../components/shared/cover/cover.component";
import { AboutBannerComponent } from "../../components/about/about-banner/about-banner.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CoverComponent, AboutBannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}

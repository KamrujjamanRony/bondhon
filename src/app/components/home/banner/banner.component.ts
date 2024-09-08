import { Component } from '@angular/core';
import { BtnPrimaryComponent } from "../../shared/btn-primary/btn-primary.component";
import { BtnSecondaryComponent } from "../../shared/btn-secondary/btn-secondary.component";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [BtnPrimaryComponent, BtnSecondaryComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {

}

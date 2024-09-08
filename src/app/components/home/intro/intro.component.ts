import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BtnPrimaryComponent } from "../../shared/btn-primary/btn-primary.component";

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [RouterLink, BtnPrimaryComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {

}

import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'btn-secondary',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './btn-secondary.component.html',
  styleUrl: './btn-secondary.component.css'
})
export class BtnSecondaryComponent {
  @Input() link: any;

}

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'btn-secondary',
    imports: [RouterLink],
    templateUrl: './btn-secondary.component.html',
    styleUrl: './btn-secondary.component.css'
})
export class BtnSecondaryComponent {
  readonly link = input<any>();

}

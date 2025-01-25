import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'btn-primary',
    imports: [RouterLink],
    templateUrl: './btn-primary.component.html',
    styleUrl: './btn-primary.component.css'
})
export class BtnPrimaryComponent {
  readonly link = input<any>();
}

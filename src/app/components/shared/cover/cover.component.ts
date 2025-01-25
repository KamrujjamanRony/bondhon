import { Component, input } from '@angular/core';

@Component({
    selector: 'app-cover',
    imports: [],
    templateUrl: './cover.component.html',
    styles: `
    .breadcrumb_section {
    background: url(/images/b.png) no-repeat;
    background-size: cover;
    position: relative;
    z-index: 1;
    background-position: center center;
  }
  `
})
export class CoverComponent {
  readonly title = input<any>('');
  readonly sub1 = input<any>('');
  readonly sub2 = input<any>('');

}

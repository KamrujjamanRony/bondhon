import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover',
  standalone: true,
  imports: [],
  templateUrl: './cover.component.html',
  styles: `
    .breadcrumb_section {
    background: url(/images/b.jpg) no-repeat;
    background-size: cover;
    position: relative;
    z-index: 1;
    background-position: center center;
  }
  `
})
export class CoverComponent {
  @Input() title: any = '';
  @Input() sub1: any = '';
  @Input() sub2: any = '';

}

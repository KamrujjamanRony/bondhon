import { Component, Input } from '@angular/core';

@Component({
    selector: 'user-card',
    imports: [],
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: any;
}

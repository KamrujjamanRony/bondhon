import { Component, Input, input } from '@angular/core';
import { NewsModalComponent } from '../../gallery/news-modal/news-modal.component';

@Component({
    selector: 'app-service-card',
    imports: [NewsModalComponent],
    templateUrl: './service-card.component.html',
    styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  readonly data = input.required<any>();
  @Input() index!: any;
  showModal: boolean = false;

  openNewsDetails() {
    this.showModal = true;
  }

  closeNewsDetails() {
    this.showModal = false;
  }

}

import { Component, Input } from '@angular/core';
import { NewsModalComponent } from '../../gallery/news-modal/news-modal.component';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [NewsModalComponent],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.css'
})
export class ServiceCardComponent {
  @Input() data!: any;
  @Input() index!: any;
  showModal: boolean = false;

  openNewsDetails() {
    this.showModal = true;
  }

  closeNewsDetails() {
    this.showModal = false;
  }

}

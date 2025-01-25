import { Component, Input, input } from '@angular/core';
import { NewsModalComponent } from "../news-modal/news-modal.component";

@Component({
    selector: 'app-gallery-card',
    imports: [NewsModalComponent],
    templateUrl: './gallery-card.component.html',
    styleUrl: './gallery-card.component.css'
})
export class GalleryCardComponent {
  readonly img = input.required<any>();
  readonly title = input.required<any>();
  @Input() description!: any;
  readonly isAside = input<boolean>(false);
  showModal: boolean = false;

  openNewsDetails() {
    this.showModal = true;
  }

  closeNewsDetails() {
    this.showModal = false;
  }

}

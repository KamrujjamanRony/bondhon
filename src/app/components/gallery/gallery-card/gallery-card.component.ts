import { Component, Input } from '@angular/core';
import { NewsModalComponent } from "../news-modal/news-modal.component";

@Component({
  selector: 'app-gallery-card',
  standalone: true,
  imports: [NewsModalComponent],
  templateUrl: './gallery-card.component.html',
  styleUrl: './gallery-card.component.css'
})
export class GalleryCardComponent {
  @Input() img!: any;
  @Input() title!: any;
  @Input() description!: any;
  @Input() isAside: boolean = false;
  showModal: boolean = false;

  openNewsDetails() {
    this.showModal = true;
  }

  closeNewsDetails() {
    this.showModal = false;
  }

}

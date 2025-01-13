import { Component, inject } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { NewsModalComponent } from "../../components/gallery/news-modal/news-modal.component";
import { GalleryCardComponent } from "../../components/gallery/gallery-card/gallery-card.component";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [GalleryCardComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  galleryService = inject(GalleryService);
  gallery?: any;


  ngOnInit(): void {
    this.galleryService.getGallery({
      "search": ""
    }).subscribe(data => {
      this.gallery = data;
    })
  }

}

import { Component, inject } from '@angular/core';
import { GalleryService } from '../../../services/gallery.service';
import { CommonModule } from '@angular/common';
import { NewsModalComponent } from '../../gallery/news-modal/news-modal.component';
import { ServiceCardComponent } from "../service-card/service-card.component";

@Component({
  selector: 'our-services',
  standalone: true,
  imports: [CommonModule, NewsModalComponent, ServiceCardComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent {
  galleryService = inject(GalleryService);
  gallery?: any;


  ngOnInit(): void {
    this.galleryService.getGallery({
      "search": ""
    }).subscribe((data: any) => {
      this.gallery = data.slice(0, 3);
    })
  }

}

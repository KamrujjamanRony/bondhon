import { Component, inject } from '@angular/core';
import { GalleryService } from '../../../services/gallery.service';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from "../service-card/service-card.component";

@Component({
  selector: 'our-services',
  imports: [CommonModule, ServiceCardComponent],
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

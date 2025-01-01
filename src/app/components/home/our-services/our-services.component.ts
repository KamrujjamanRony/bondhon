import { Component, inject } from '@angular/core';
import { BtnPrimaryComponent } from "../../shared/btn-primary/btn-primary.component";
import { GalleryService } from '../../../services/gallery.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'our-services',
  standalone: true,
  imports: [BtnPrimaryComponent, CommonModule],
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

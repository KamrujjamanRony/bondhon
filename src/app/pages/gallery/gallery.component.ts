import { Component, inject } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  galleryService = inject(GalleryService);
  gallery?: any;

  constructor() { }

  ngOnInit(): void {
    this.galleryService.getAllGallery().subscribe(data => {
      this.gallery = data;
    })
  }

}

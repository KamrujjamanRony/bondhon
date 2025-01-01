import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoverComponent } from '../../../components/shared/cover/cover.component';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-gallery-list',
  standalone: true,
  imports: [RouterLink, CoverComponent],
  templateUrl: './gallery-list.component.html',
  styleUrl: './gallery-list.component.css'
})
export class GalleryListComponent {
  galleryService = inject(GalleryService);
  gallery?: any;
  emptyImg: any = 'https://www.mykite.in/kb/NoImageFound.jpg.png'

  constructor() { }

  ngOnInit(): void {
    this.galleryService.getGallery({
      "search": ""
    }).subscribe(data => {
      this.gallery = data;
    })
  }

  onDelete(id: any): void {
    if (confirm("Are you sure you want to delete?")) {
      this.galleryService.deleteGallery(id).subscribe(data => {
        if (data.id) {
          this.gallery = this.gallery.filter((d: any) => d.id !== id);
          alert("Gallery deleted successfully!");
        } else {
          console.error('Error deleting gallery:', data);
        }
      });
    }
  }

}

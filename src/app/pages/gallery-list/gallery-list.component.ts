import { Component, inject } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { RouterLink } from '@angular/router';
import { CoverComponent } from "../../components/shared/cover/cover.component";

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
    this.galleryService.getAllGallery().subscribe(data => {
      this.gallery = data;
    })
  }

  onDelete(id: any): void {}

}

import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { GalleryService } from '../../services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from "../../components/shared/confirm-modal/confirm-modal.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery-form',
  standalone: true,
  imports: [ConfirmModalComponent, FormsModule],
  templateUrl: './gallery-form.component.html',
  styleUrl: './gallery-form.component.css'
})
export class GalleryFormComponent {
  galleryService = inject(GalleryService);
  route = inject(ActivatedRoute);
  id: any = null;
  model?: any;
  confirmModal: boolean = false;
  paramsSubscription?: Subscription;
  gallerySubscription?: Subscription;

  constructor() {
    this.onReset();
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        console.log(this.id)
        if (this.id) {
          this.galleryService.getGallery(this.id)
            .subscribe({
              next: (response) => {
                if (response) {
                  this.model = response[0];
                }
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {

    // const formData = new FormData();
    // formData.append('image', this.model.image || "");
    // formData.append('title', this.model.title || "");
    // formData.append('description', this.model.description || "");
    const formData = { id: crypto.randomUUID().toString(), title: this.model.title, description: this.model.description, image: this.model.image }

    if (this.id) {
      this.gallerySubscription = this.galleryService.updateGallery(this.id, formData)
        .subscribe({
          next: (response) => {
            this.confirmModal = true;
          }
        });
    } else {
      this.gallerySubscription = this.galleryService.addGallery(formData)
        .subscribe({
          next: (response) => {
            this.confirmModal = true;
          }
        });
    }
  };

  onReset(){
    this.model = {
      title: "",
      description: "",
      image: "",
    };
  }

  closeModal() {
    this.confirmModal = false;
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.gallerySubscription?.unsubscribe();
  }

}

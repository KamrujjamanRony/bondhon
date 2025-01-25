import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../../../components/shared/confirm-modal/confirm-modal.component';
import { GalleryService } from '../../../services/gallery.service';

@Component({
    selector: 'app-gallery-form',
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
        if (this.id) {
          this.galleryService.getGallery({
            "search": this.id
          })
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

    if (this.id) {
      this.gallerySubscription = this.galleryService.updateGallery(this.id, this.model)
        .subscribe({
          next: (response) => {
            this.confirmModal = true;
          }
        });
    } else {
      this.gallerySubscription = this.galleryService.addGallery(this.model)
        .subscribe({
          next: (response) => {
            this.confirmModal = true;
          }
        });
    }
  };

  onReset() {
    this.model = {
      title: "",
      description: "",
      link: "",
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

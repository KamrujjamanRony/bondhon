import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {
  adminService = inject(AdminService);
  route = inject(ActivatedRoute);
  id: any = null;
  model?: any;
  confirmModal: boolean = false;
  paramsSubscription?: Subscription;
  adminSubscription?: Subscription;

  constructor() {
    this.onReset();
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        console.log(this.id)
        if (this.id) {
          this.adminService.getAdmin("admin", "password")
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
      this.adminSubscription = this.adminService.updateAdmin(this.id, formData)
        .subscribe({
          next: (response) => {
            this.confirmModal = true;
          }
        });
    } else {
      this.adminSubscription = this.adminService.addAdmin(formData)
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
    this.adminSubscription?.unsubscribe();
  }

}

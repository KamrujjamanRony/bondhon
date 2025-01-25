import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../../components/shared/confirm-modal/confirm-modal.component';
import { AdminService } from '../../../services/admin.service';

@Component({
    selector: 'app-admin-form',
    imports: [ConfirmModalComponent, FormsModule, CommonModule],
    templateUrl: './admin-form.component.html',
    styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {
  adminService = inject(AdminService);
  route = inject(ActivatedRoute);
  id: any = null;
  model?: any;
  confirmModal: boolean = false;
  roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'super-admin', label: 'Super Admin' },
    { value: 'user-entry', label: 'User Entry' }
  ]
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
          this.adminService.getAdmin(this.id)
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
      this.adminSubscription = this.adminService.updateAdmin(this.id, this.model)
        .subscribe({
          next: (response) => {
            this.confirmModal = true;
          }
        });
    } else {
      this.adminSubscription = this.adminService.addAdmin(this.model)
        .subscribe({
          next: (response) => {
            this.confirmModal = true;
          }
        });
    }
  };

  onReset() {
    this.model = {
      name: "",
      mobileNumber: "",
      address: "",
      role: "",
      pass: "",
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

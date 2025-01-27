import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {
  adminService = inject(AdminService);
  route = inject(ActivatedRoute);
  id: any = null;
  model?: any;
  roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'super-admin', label: 'Super Admin' },
    { value: 'user-entry', label: 'User Entry' }
  ]
  paramsSubscription?: Subscription;
  adminSubscription?: Subscription;
  error = signal<any>(null);
  success = signal<any>(null);
  loading = signal<boolean>(false);

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
    const { name, mobileNumber, role, pass } = this.model;
    this.loading.set(true);
    if (name && mobileNumber && role && pass) {

      if (this.id) {
        this.adminSubscription = this.adminService.updateAdmin(this.id, this.model)
          .subscribe({
            next: (response) => {
              this.success.set('Admin Update successfully');
              this.onReset();
              this.id = null;
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Update Admin:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      } else {
        this.adminSubscription = this.adminService.addAdmin(this.model)
          .subscribe({
            next: (response) => {
              this.success.set('Admin Add successfully');
              this.onReset();
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Add Admin:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      }
    } else {
      this.error.set('All Fields are required!');
      setTimeout(() => {
        this.error.set(null);
        this.loading.set(false);
      }, 1500);
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

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.adminSubscription?.unsubscribe();
  }

}

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../services/data.service';
import { ThanaService } from '../../../services/thana.service';

@Component({
  selector: 'app-thana-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './thana-form.component.html',
  styleUrl: './thana-form.component.css'
})
export class ThanaFormComponent {
  private dataService = inject(DataService);
  thanaService = inject(ThanaService);
  route = inject(ActivatedRoute);
  id: any = null;
  model?: any;
  divisions: any;
  districts: any;
  paramsSubscription?: Subscription;
  thanaSubscription?: Subscription;
  error = signal<any>(null);
  success = signal<any>(null);
  loading = signal<boolean>(false);

  constructor() {
    this.onReset();
  }

  ngOnInit(): void {
    this.dataService.getJsonData().subscribe(data => {
      this.divisions = data?.divisions;
    });
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.thanaService.getThana({
            "search": this.id,
            "division": ""
          })
            .subscribe({
              next: (response) => {
                if (response) {
                  this.model = response[0];
                  if (this.model.division) {
                    this.onDivisionChanged();
                  }
                }
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {
    const { division, district, thana1 } = this.model;
    this.loading.set(true);
    if (division && district && thana1) {
      if (this.id) {
        this.thanaSubscription = this.thanaService.updateThana(this.id, this.model)
          .subscribe({
            next: (response) => {
              this.success.set('Thana Update successfully');
              this.onReset();
              this.id = null;
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Update Thana:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      } else {
        this.thanaSubscription = this.thanaService.addThana(this.model)
          .subscribe({
            next: (response) => {
              this.success.set('Thana Add successfully');
              this.onReset();
              setTimeout(() => {
                this.success.set(null);
                this.loading.set(false);
              }, 1500);
            },
            error: (error) => {
              this.error.set(error.error.message);
              console.error('Error Add Thana:', error.error);
              setTimeout(() => {
                this.error.set(null);
                this.loading.set(false);
              }, 1500);
            }
          });
      }

    } else {
      alert('Please Fill all the required fields');
      this.loading.set(false);
    }
  };

  onReset() {
    this.model = {
      division: "",
      district: "",
      thana1: "",
    };
  }

  onDivisionChanged() {
    this.dataService.getCityByParentId(this.model.division).subscribe(
      data => {
        this.districts = data;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.thanaSubscription?.unsubscribe();
  }

}

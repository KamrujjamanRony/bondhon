import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../../components/shared/confirm-modal/confirm-modal.component';
import { DataService } from '../../../services/data.service';
import { ThanaService } from '../../../services/thana.service';

@Component({
  selector: 'app-thana-form',
  standalone: true,
  imports: [ConfirmModalComponent, FormsModule, CommonModule],
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
  confirmModal: boolean = false;
  paramsSubscription?: Subscription;
  thanaSubscription?: Subscription;

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
    if (this.model.division && this.model.district && this.model.thana1) {

      if (this.id) {
        this.thanaSubscription = this.thanaService.updateThana(this.id, this.model)
          .subscribe({
            next: (response) => {
              this.confirmModal = true;
            }
          });
      } else {
        this.thanaSubscription = this.thanaService.addThana(this.model)
          .subscribe({
            next: (response) => {
              this.confirmModal = true;
            }
          });
      }

    } else {
      alert('Please Fill all the required fields');
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

  closeModal() {
    this.confirmModal = false;
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.thanaSubscription?.unsubscribe();
  }

}

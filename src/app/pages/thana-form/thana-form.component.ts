import { Component, inject } from '@angular/core';
import { ConfirmModalComponent } from '../../components/shared/confirm-modal/confirm-modal.component';
import { FormsModule } from '@angular/forms';
import { ThanaService } from '../../services/thana.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

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
          this.thanaService.getThana({ "search" : this.id})
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
  };

  onReset(){
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

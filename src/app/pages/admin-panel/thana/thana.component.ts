import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoverComponent } from '../../../components/shared/cover/cover.component';
import { ThanaService } from '../../../services/thana.service';
import { DataService } from '../../../services/data.service';
import { InputsComponent } from "../../../components/shared/inputs/inputs.component";

@Component({
  selector: 'app-thana',
  imports: [RouterLink, CoverComponent, InputsComponent],
  templateUrl: './thana.component.html',
  styleUrl: './thana.component.css'
})
export class ThanaComponent {
  private thanaService = inject(ThanaService);
  private dataService = inject(DataService);
  model: any;
  divisions = signal<any>([]);
  districts = signal<any>([]);
  thana?: any;
  loading = signal<boolean>(false);

  constructor() {
    this.model = {
      division: '',
      district: ''
    };
  }

  ngOnInit(): void {
    this.loading.set(true);
    this.dataService.getJsonData().subscribe(data => {
      this.divisions.set(data?.divisions);
      this.model.division = this.divisions()[0]?.name;
      this.onDivisionChanged();
    });
  }

  loadThana() {
    const reqData = {
      "division": this.model.division,
      "Search": this.model.district
    }
    this.thanaService.getThana(reqData).subscribe(data => {
      this.thana = data;
      this.loading.set(false);
    })
  }

  onDelete(id: any): void {
    if (confirm("Are you sure you want to delete?")) {
      this.thanaService.deleteThana(id).subscribe(data => {
        if (data.id) {
          this.thana = this.thana.filter((d: any) => d.id !== id);
          alert("Thana deleted successfully!");
        } else {
          console.error('Error deleting Thana:', data);
        }
      });
    }
  }

  onDivisionChanged() {
    this.dataService.getCityByParentId(this.model.division).subscribe(
      data => {
        this.districts.set(data);
        this.loadThana();
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

  onDistrictChanged() {
    this.thanaService.getThana({
      "Search": this.model.district,
      "division": ""
    }).subscribe(data => {
      this.thana.set(data);
      this.loadThana();
    })
  }

  onClearFilter() {
    this.model = {
      division: this.divisions()[0]?.name,
      district: ''
    };
    this.loadThana();
  }

}

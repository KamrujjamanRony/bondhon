import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoverComponent } from '../../components/shared/cover/cover.component';
import { ThanaService } from '../../services/thana.service';

@Component({
  selector: 'app-thana',
  standalone: true,
  imports: [RouterLink, CoverComponent],
  templateUrl: './thana.component.html',
  styleUrl: './thana.component.css'
})
export class ThanaComponent {
  thanaService = inject(ThanaService);
  thana?: any;

  constructor() { }

  ngOnInit(): void {
    this.thanaService.getThana({}).subscribe(data => {
      this.thana = data;
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

}

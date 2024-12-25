import { Component, inject } from '@angular/core';
import { BtnPrimaryComponent } from "../../shared/btn-primary/btn-primary.component";
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [BtnPrimaryComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {
  private dataService = inject(DataService);
  conditions: any;

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {
      this.conditions = data?.conditions;
    });
  }

}

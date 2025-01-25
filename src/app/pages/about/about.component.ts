import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoverComponent } from '../../components/shared/cover/cover.component';
import { AboutService } from '../../services/about.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    imports: [CoverComponent]
})
export class AboutComponent implements OnInit {
  allAbout$?: Observable<any[]>;
  about!: any;

  constructor(private aboutService: AboutService) { }
  
  ngOnInit(): void {
    this.allAbout$ = this.aboutService.getAllAbout();
      this.allAbout$.subscribe(aboutUs => {
        if (aboutUs) {
          this.about = aboutUs.find(a=>a.companyID.toString() === this.aboutService.companyCode);
        }
      });
  };
}

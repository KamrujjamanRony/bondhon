import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CoverComponent } from '../../components/shared/cover/cover.component';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  standalone: true,
  imports: [CoverComponent, FormsModule]
})
export class AboutUsComponent implements OnInit, OnDestroy {
  id: string | null = null;
  aboutInfo?: any;
  paramsSubscription?: Subscription;
  editAboutUsSubscription?: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private aboutService: AboutService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.aboutService.getAbout(this.id)
            .subscribe({
              next: (response) => {
                this.aboutInfo = response;
              }
            });
        }
      }
    });
  }

  onFormSubmit(): void {

    const formData = new FormData();

    formData.append('companyID', this.aboutService.companyCode.toString());
    formData.append('heading', this.aboutInfo?.heading ?? '');
    formData.append('title', this.aboutInfo?.title ?? '');
    formData.append('description', this.aboutInfo?.description ?? '');
    formData.append('title2', this.aboutInfo?.title2 ?? '');
    formData.append('description2', this.aboutInfo?.description2 ?? '');
    formData.append('title3', this.aboutInfo?.title3 ?? '');
    formData.append('description3', this.aboutInfo?.description3 ?? '');
    formData.append('title4', this.aboutInfo?.title4 ?? '');
    formData.append('description4', this.aboutInfo?.description4 ?? '');
    formData.append('title5', this.aboutInfo?.title5 ?? '');
    formData.append('description5', this.aboutInfo?.description5 ?? '');

    if (this.id) {
      this.editAboutUsSubscription = this.aboutService.updateAbout(this.id, formData)
        .subscribe({
          next: (response) => {
            this.router.navigate(['about']);
          }
        });
    }
  };

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editAboutUsSubscription?.unsubscribe();
  }

}

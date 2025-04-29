import { Component, inject, signal } from '@angular/core';
import { BtnPrimaryComponent } from "../../shared/btn-primary/btn-primary.component";
import { BtnSecondaryComponent } from "../../shared/btn-secondary/btn-secondary.component";
import { DataService } from '../../../services/data.service';

@Component({
    selector: 'app-banner',
    imports: [BtnPrimaryComponent, BtnSecondaryComponent],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.css'
})
export class BannerComponent {
    private dataService = inject(DataService);
    downloadAndroidAppUrl = signal('');
    downloadIosAppUrl = signal('');

    ngOnInit() {
        this.dataService.getJsonData().subscribe(data => {
            this.downloadAndroidAppUrl.set(data?.download?.android);
            this.downloadIosAppUrl.set(data?.download?.ios);
        });
    }

}

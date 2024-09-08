import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBannerComponent } from './sub-banner.component';

describe('SubBannerComponent', () => {
  let component: SubBannerComponent;
  let fixture: ComponentFixture<SubBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

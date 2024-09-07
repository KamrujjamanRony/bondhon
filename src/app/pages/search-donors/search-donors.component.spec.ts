import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDonorsComponent } from './search-donors.component';

describe('SearchDonorsComponent', () => {
  let component: SearchDonorsComponent;
  let fixture: ComponentFixture<SearchDonorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDonorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

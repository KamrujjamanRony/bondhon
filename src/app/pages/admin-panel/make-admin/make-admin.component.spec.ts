import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAdminComponent } from './make-admin.component';

describe('MakeAdminComponent', () => {
  let component: MakeAdminComponent;
  let fixture: ComponentFixture<MakeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

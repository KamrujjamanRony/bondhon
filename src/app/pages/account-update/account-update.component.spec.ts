import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUpdateComponent } from './account-update.component';

describe('AccountUpdateComponent', () => {
  let component: AccountUpdateComponent;
  let fixture: ComponentFixture<AccountUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

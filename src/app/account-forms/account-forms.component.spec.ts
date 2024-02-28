import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormsComponent } from './account-forms.component';

describe('AccountFormsComponent', () => {
  let component: AccountFormsComponent;
  let fixture: ComponentFixture<AccountFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

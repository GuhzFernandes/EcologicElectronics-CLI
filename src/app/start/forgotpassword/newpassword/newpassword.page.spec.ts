import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewpasswordPage } from './newpassword.page';

describe('NewpasswordPage', () => {
  let component: NewpasswordPage;
  let fixture: ComponentFixture<NewpasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

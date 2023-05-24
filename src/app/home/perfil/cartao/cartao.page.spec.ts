import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoPage } from './cartao.page';

describe('CartaoPage', () => {
  let component: CartaoPage;
  let fixture: ComponentFixture<CartaoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CartaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

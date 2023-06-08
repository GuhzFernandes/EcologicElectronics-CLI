import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoConfirmadoPage } from './pedido-confirmado.page';

describe('PedidoConfirmadoPage', () => {
  let component: PedidoConfirmadoPage;
  let fixture: ComponentFixture<PedidoConfirmadoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidoConfirmadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

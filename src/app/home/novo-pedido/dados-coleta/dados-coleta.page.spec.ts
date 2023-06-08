import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DadosColetaPage } from './dados-coleta.page';

describe('DadosColetaPage', () => {
  let component: DadosColetaPage;
  let fixture: ComponentFixture<DadosColetaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DadosColetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

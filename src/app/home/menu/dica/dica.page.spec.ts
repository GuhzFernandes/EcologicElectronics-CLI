import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DicaPage } from './dica.page';

describe('DicaPage', () => {
  let component: DicaPage;
  let fixture: ComponentFixture<DicaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

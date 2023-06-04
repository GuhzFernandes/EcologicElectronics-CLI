import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dados-coleta',
  templateUrl: './dados-coleta.page.html',
  styleUrls: ['./dados-coleta.page.scss'],
})
export class DadosColetaPage implements OnInit {
  //Definindo o segmento padrão para ser exibido
  segmento = 'pix';
  
  namecard = '';
  numcard = '';
  validcard = '';
  cvvcard = '';

  constructor() {
    //console.log(this.segmento)
  }

  ngOnInit() {
  }

}

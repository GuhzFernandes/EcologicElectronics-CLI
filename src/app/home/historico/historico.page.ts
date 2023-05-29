import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  segmento = 'confirmados';

  pedidosConfirmados = [
    { Tipo: 'Pequeno', data: '01/01/2023' },
    { Tipo: 'Pequeno', data: '01/01/2023' },
    { Tipo: 'Pequeno', data: '01/01/2023' },
  ];

  historicoPedidos = [
    { Tipo: 'Grande', data: '01/01/2023' },
    { Tipo: 'Grande', data: '01/01/2023' },
    { Tipo: 'Grande', data: '01/01/2023' },
  ];
  constructor() { }

  ngOnInit() {
  }

}

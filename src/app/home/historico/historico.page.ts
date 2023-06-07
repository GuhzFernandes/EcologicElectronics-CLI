import { Component, OnInit } from '@angular/core';
import IOrder from 'src/app/interfaces/IOrder';
import { LoginService } from 'src/app/services/login.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  segmento = 'confirmados';
  public idUsuario?: number; 

  public pedidosAtivos:IOrder[] = [];
  public historicoPedidos = [
    { Tipo: 'Pequeno', data: '01/01/2023' },
    { Tipo: 'Médio', data: '01/01/2023' },
    { Tipo: 'Grande', data: '01/01/2023' },
  ];
  constructor(private loginService: LoginService,private pedidoService: PedidoService) { }

  async ngOnInit() {
    this.loginService.getUser().then( (user) => {
      this.idUsuario = user.id;
    }).then(()=>{
      this.pedidoService.listarPedidos()
      .then( ()=> { this.pedidoService.getPedidos()
        .then( (pedidos) => { this.pedidosAtivos = pedidos;
          console.log(this.pedidosAtivos);
        })
      })
    });
  }

}

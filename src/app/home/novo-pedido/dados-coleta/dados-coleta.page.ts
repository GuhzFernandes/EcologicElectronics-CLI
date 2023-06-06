import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-dados-coleta',
  templateUrl: './dados-coleta.page.html',
  styleUrls: ['./dados-coleta.page.scss'],
})
export class DadosColetaPage implements OnInit {
  //Definindo o segmento padrão para ser exibido
  public segmento: string = 'pix';
  public tamanho: string = '';

  public idUsuario?: number; 
  public statusPagamento: string = 'Aguard. pgto';
  public statusPedido: string = 'Aguard. pgto';

  
  public namecard:string = '';
  public numcard: string = '';
  public validcard: string = '';
  public cvvcard: string = '';

  constructor(private router: Router,private loginService: LoginService,private pedidoService: PedidoService) {
  }

  async ngOnInit() {
    await this.loginService.getUser().then( (user) => {
      this.idUsuario = user.id;
    });
  }

  public confirmarPedido(){
    //this.pedidoService.novoPedido(this.segmento,this.statusPagamento,this.statusPedido,this.tamanho,this.idUsuario);
    //this.router.navigate(["/home/novo-pedido/pedido-confirmado"]);
    this.pedidoService.listarPedidos(this.idUsuario);
  }

}

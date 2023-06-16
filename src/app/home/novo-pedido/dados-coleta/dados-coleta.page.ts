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

  formatarCVV(cvv: string): string {
    // Remove todos os caracteres que não sejam dígitos
    const numeros = cvv.replace(/\D/g, '');

    // Limita o valor para no máximo 3 dígitos
    const cvvFormatado = numeros.slice(0, 3);

    return cvvFormatado;
  }

  formatarNumCard(numcard: string): string {
    // Remove todos os caracteres não numéricos
    const cartao = numcard.replace(/\D/g, '');

    // Formata o número do cartão
    const numEditado = cartao.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');

    const cartaoFormatado = numEditado.slice(0, 19);

    return cartaoFormatado;
  }

  formatarValidCard(validcard: string): string {
    // Remove todos os caracteres não numéricos
    const validadecard = validcard.replace(/\D/g, '');

    // Formata o número do cartão
    const validadeEditado = validadecard.replace(/(\d{2})(\d{2})/, '$1/$2');

    const validadeFormatado = validadeEditado.slice(0, 5);

    return validadeFormatado;
  }
  //Definindo o cep pelo via cep
  public cep: string = '';
  public logradouro = '';
  public bairro = '';
  public complemento = '';

  //Definindo o segmento padrão para ser exibido
  public segmento: string = 'pix';
  public tamanho: string = '';

  public idUsuario?: number;
  public statusPagamento: string = 'Aguard. pgto';
  public statusPedido: string = 'Aguard. pgto';


  public namecard: string = '';
  public numcard: string = '';
  public validcard: string = '';
  public cvvcard: string = '';

  constructor(private router: Router, private loginService: LoginService, private pedidoService: PedidoService) {
  }

  async ngOnInit() {
    await this.loginService.getUser().then((user) => {
      this.idUsuario = user.id;
    });
  }

  public confirmarPedido() {
    this.pedidoService.novoPedido(this.segmento, this.statusPagamento, this.statusPedido, this.tamanho, this.idUsuario);
    this.router.navigate(["/home/novo-pedido/pedido-confirmado"]);
  }

  buscarCEP() {
    if (this.cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${this.cep}/json/`)
        .then(response => response.json())
        .then(data => {
          this.logradouro = data.logradouro;
          this.bairro = data.bairro;
          this.complemento = data.complemento;
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.logradouro = '';
      this.bairro = '';
      this.complemento = '';
    }
  }
}

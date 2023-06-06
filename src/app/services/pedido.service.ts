import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import IOrder from '../interfaces/IOrder';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  public order: IOrder = {};
  public pedidos: IOrder[] = [];
  public storage: Storage;
  private api: string = 'http://localhost:8080/pedido'

  constructor(storage: Storage, private http: HttpClient) {
    this.storage = storage;
    this.storage.create();
    this.storage.get('pedidos');
  }

  public async setPedidos(novoPedido: IOrder) {
    this.pedidos = await this.storage.get('pedidos');
    this.pedidos.push(novoPedido);
    this.storage.set('pedidos',this.pedidos);
  }

  public async getUser() {
    this.pedidos = await this.storage.get('pedidos');
    return this.pedidos;
  }

  //Metodo GET - all
  public async listarPedidos(idUsuario?:number) {
    this.pedidos=[];
    const response = await fetch(`${this.api}/${idUsuario}`);
    const data = await response.json();
    console.log(data);
    this.storage.set('pedidos', this.pedidos);
  }

  //Metodo POST
  public async novoPedido(pagamento:string,statusPagamento:string,statusPedido:string,tamanho:string,idUsuario?:number) {
    const response = await fetch(`${this.api}/`, {
      method: 'POST',
      body: JSON.stringify({
        user:{
          id: idUsuario
        },
        tipolixo: `${tamanho}`,
        statuspedido: `${statusPedido}`,
        statuspagamento: `${statusPagamento}`,
        formapagamento: `${pagamento}`
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    console.log(await response.json());
    //this.listarPedidos(idUsuario);
  }



}

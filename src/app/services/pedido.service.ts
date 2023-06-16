import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import IOrder from '../interfaces/IOrder';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  public order: IOrder = {};
  public pedidos: IOrder[] = [];
  public storage: Storage;
  private api: string = 'http://localhost:8080/pedido'

  constructor(storage: Storage, private http: HttpClient, private notification: NotificationService) {
    this.storage = storage;
    this.storage.create();
    this.storage.get('pedidos');
  }

  public async setPedidos(novoPedido: IOrder) {
    this.pedidos = await this.storage.get('pedidos');
    this.pedidos.push(novoPedido);
    this.storage.set('pedidos',this.pedidos);
  }

  public async getPedidos():Promise<IOrder[]> {
    this.pedidos = await this.storage.get('pedidos');
    return this.pedidos;
  }

  //Metodo GET - all
  public async listarPedidos(idUsuario?:number) {
    this.pedidos=[];
    try {
      const response = await fetch(`${this.api}/usuario/${idUsuario}`);
      console.log(response.status);
      if(response.status == 200){
        await response.json()
        .then( (data) => {
          for (const item of data){
            item.begindate = this.formatarData(new Date(item.begindate));
            this.pedidos.push(item);
          }
          this.storage.set('pedidos', this.pedidos);
        });
      }
      else{
        this.notification.longError('Erro ao carregar pedidos antigos, tente novamente mais tarde!');
      }      
    } catch (error) {
      console.log(error);
      this.notification.longError('Erro ao carregar pedidos antigos, tente novamente mais tarde!');
    }
  }

  //Metodo POST
  public async novoPedido(pagamento:string,statusPagamento:string,statusPedido:string,tamanho:string,idUsuario?:number) {
    try {
      const response = await fetch(`${this.api}`, {
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
      console.log(response.status);
      if(response.status == 201){
        this.listarPedidos(idUsuario);
      }
      else{
        this.notification.longError('Erro ao efetuar pedido, tente novamente mais tarde!');
      }
    } catch (error) {
      console.log(error);
      this.notification.longError('Erro ao efetuar pedido, tente novamente mais tarde!');
    }
  }

  public formatarData(data: Date):string{
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

}

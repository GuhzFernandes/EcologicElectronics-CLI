import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import IUser from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user: IUser = {};
  public storage: Storage;
  private api: string = 'http://localhost:8080/user'

  constructor(storage: Storage, private http: HttpClient, private notification: NotificationService) {
    this.storage = storage;
    this.storage.create();
    this.storage.get('user');

  }

  //Metodo GET
  public async login(email: string, password: string, keepMeLoggedIn: boolean) {
    try {
      const response = await fetch(`${this.api}/login?email=${email}&senha=${password}`);
      console.log(response.status);
      if (response.status == 200){
        const data = await response.json();
        const userData = data;
        this.user = {
          id: userData.id,
          firstName: userData.nome,
          lastName: userData.sobrenome,
          email: userData.email,
          password: userData.senha,
          phoneNumber: userData.telefone,
          cpf: userData.cpf
        };
        this.storage.set('user', this.user);
        this.storage.set('keepLogin', keepMeLoggedIn);
      }
      else{
        this.notification.longError('Erro ao efetuar login, tente novamente mais tarde!');
      }
    } catch (error) {
      console.log(error);
      this.notification.longError('Erro ao efetuar login, tente novamente mais tarde!');
    }
  }

  //Metodo POST
  public async signup(firstName: string, lastName: string, email: string, password: string) {
    try {
      const response = await fetch(`${this.api}/cadastro`, {
        method: 'POST',
        body: JSON.stringify({
          nome: `${firstName}`,
          sobrenome: `${lastName}`,
          email: `${email}`,
          senha: `${password}`
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      });
      console.log(response.status);
      if(response.status == 201){
        const data = await response.json();
        const userData = data;
        this.user = {
          id: userData.id,
          firstName: userData.nome,
          lastName: userData.sobrenome,
          email: userData.email,
          password: userData.senha,
          phoneNumber: userData.telefone,
          cpf: userData.cpf
        };
        this.storage.set('user', this.user);
        this.storage.set('keepLogin', true);
      }
      else{
        this.notification.longError('Erro ao efetuar cadastro, tente novamente mais tarde!');
      }
    } catch (error) {
      console.log(error);
      this.notification.longError('Erro ao efetuar cadastro, tente novamente mais tarde!');
    }
    
  }

  //Metodo PUT - Update
  public async updateUser(nome: string, sobrenome: string, email: string, telefone?: number, cpf?: number) {
    this.user = await this.getUser();
    this.user = {
      id: this.user.id,
      firstName: nome,
      lastName: sobrenome,
      email: email,
      password: this.user.password,
      phoneNumber: telefone,
      cpf: cpf
    };
    console.log(this.user);
    try {
      const response = await fetch(`${this.api}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: this.user.id,
          nome: `${this.user.firstName}`,
          sobrenome: `${this.user.lastName}`,
          email: `${this.user.email}`,
          senha: `${this.user.password}`,
          telefone: this.user.phoneNumber,
          cpf: this.user.cpf
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      });
      if(await response.status == 200){
        console.log(await response.status);
        this.storage.set('user', this.user);
        this.notification.defaultSuccess('Perfil Atualizado!');
      }
      else{
        console.log(await response.status);
        this.notification.longError('Erro ao atualizar os dados, tente novamente mais tarde!');
      }
    } catch (error) {
      console.log(error);
      this.notification.longError('Erro ao atualizar os dados, tente novamente mais tarde!');
    }
    
  }

  //Metodo PUT - Update
  public async updatePassword(senha: string) {
    this.user = await this.getUser();
    this.user = {
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: senha,
      phoneNumber: this.user.phoneNumber,
      cpf: this.user.cpf
    };
    console.log(this.user);
    try {
      const response = await fetch(`${this.api}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: this.user.id,
          nome: `${this.user.firstName}`,
          sobrenome: `${this.user.lastName}`,
          email: `${this.user.email}`,
          senha: `${this.user.password}`,
          telefone: this.user.phoneNumber,
          cpf: this.user.cpf
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      });
      if(await response.status == 200){
        console.log(await response.status);
        this.storage.set('user', this.user);
        this.notification.defaultSuccess('Senha Atualizada!');
      }
      else{
        console.log(await response.status);
        this.notification.longError('Erro ao atualizar a senha, tente novamente mais tarde!');
      }
    } catch (error) {
      console.log(error);
      this.notification.longError('Erro ao atualizar a senha, tente novamente mais tarde!');
    }
    
  }

  public async checkUser(): Promise<boolean> {
    this.user = await this.storage.get('user');
    console.log(this.user);
    return this.user != null ? true : false;
  }

  public async setUser(updatedUser: IUser) {
    this.user = updatedUser
    this.storage.set('user', this.user);
  }

  public async getUser() {
    return this.storage.get('user');
  }

  public async startUser() {
    let keepLogin = false;
    keepLogin = await this.storage.get('keepLogin');
    if (keepLogin == false) {
      this.storage.clear();
      console.log('Usuario resetado com sucesso!');
    }
  }

  public logout() {
    this.storage.clear();
    console.log('Usuario resetado com sucesso!');
  }

  public async remove(){
    this.user = await this.getUser();
    try {
      const response = await fetch(`${this.api}/deletar/${this.user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      if(await response.status == 200){
        console.log(await response.status);
        this.logout
        this.notification.defaultSuccess('Perfil deletado com sucesso');
      }
      else{
        console.log(await response.status);
        this.notification.longError('Erro ao deletar a conta, tente novamente mais tarde!');
      }
      } catch (error) {
        console.log(error);
        this.notification.longError('Erro ao deletar a conta, tente novamente mais tarde!');
      }
  }

}

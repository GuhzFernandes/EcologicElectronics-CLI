import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import IUser from '../interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user: IUser = {};
  public storage: Storage;
  private api: string = 'http://localhost:8080/user'

  constructor(storage: Storage, private http: HttpClient) {
    this.storage = storage;
    this.storage.create();
    this.storage.get('user');

  }

  //Metodo GET
  public async login(email: string, password: string, keepMeLoggedIn: boolean) {
    const response = await fetch(`${this.api}/login?email=${email}&senha=${password}`);
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

  //Metodo POST
  public async signup(firstName: string, lastName: string, email: string, password: string) {
    const dados = { nome: firstName, sobrenome: lastName, email: email, senha: password };
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

  //Metodo PUT
  public async update(nome: string, sobrenome: string, email: string, senha: string, telefone?: number, cpf?: number) {
    this.user = {
      id: this.user.id,
      firstName: nome,
      lastName: sobrenome,
      email: email,
      password: senha,
      phoneNumber: telefone,
      cpf: cpf
    };
    this.storage.set('user', this.user);
    const response = await fetch(`${this.api}/${this.user.id}`, {
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
    console.log(await response.json());
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
    this.user = await this.storage.get('user');
    console.log(this.user);
    return this.user;
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

}

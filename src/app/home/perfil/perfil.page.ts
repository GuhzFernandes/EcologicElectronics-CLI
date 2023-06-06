import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import IUser from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  

  constructor(private router: Router,private loginService: LoginService) { 
  }
  public nome: string = '';
  public email: string = '';
  public user: IUser = {};

  async ngOnInit() {
    this.user = await this.loginService.getUser();
    this.nome = this.user.firstName?? '';
    this.email = this.user.email?? '';
  } 

  public logout():void{
    this.loginService.logout();
    this.router.navigate(["/start"]);
  }
}

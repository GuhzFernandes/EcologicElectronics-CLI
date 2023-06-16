import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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

  async ngOnInit() {
    this.loginService.getUser().then( (user) => {
      this.nome = user.firstName?? '';
      this.email = user.email?? '';
    });
  }

  async ionViewDidEnter(){
    this.loginService.getUser().then( (user) => {
      this.nome = user.firstName?? '';
      this.email = user.email?? '';
    });
  }

  public logout():void{
    this.loginService.logout();
    this.router.navigate(["/start"]);
  }
}

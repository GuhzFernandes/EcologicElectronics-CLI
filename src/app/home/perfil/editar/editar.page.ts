import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  constructor(private router: Router,private loginService: LoginService) { 
  }
  public nome: string = '';
  public sobrenome: string = '';
  public email: string = '';
  public telefone?: number;
  public cpf?: number;

  async ngOnInit() {
    await this.loginService.getUser().then( (user) => {
      this.nome = user.firstName?? '';
      this.sobrenome = user.lastName??'';
      this.email = user.email?? '';
      this.telefone = user.phoneNumber;
      this.cpf = user.cpf;
    });
  }

  async save():Promise<void>{
    this.loginService.update(this.nome, this.sobrenome, this.email, this.telefone, this.cpf);  
    this.router.navigate(["/home/perfil"]);
    }

}
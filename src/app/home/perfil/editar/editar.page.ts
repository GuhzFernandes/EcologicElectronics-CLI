import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  @ViewChild('cpfInput', { static: false }) cpfInput!: IonInput;
  @ViewChild('telefoneInput', { static: false }) telefoneInput!: IonInput;

  public nome: string = '';
  public sobrenome: string = '';
  public email: string = '';
  public senha: string = '';
  public telefone?: number;
  public cpf?: number;

  constructor(private router: Router, private loginService: LoginService) {}

  async ngOnInit() {
    await this.loginService.getUser().then((user) => {
      this.nome = user.firstName ?? '';
      this.sobrenome = user.lastName ?? '';
      this.email = user.email ?? '';
      this.senha = user.password ?? '';
      this.telefone = user.phoneNumber;
      this.cpf = user.cpf;
    });
  }

  async ngAfterViewInit() {
    const cpfInputElement = await this.cpfInput.getInputElement();
    const telefoneInputElement = await this.telefoneInput.getInputElement();

    Inputmask({
      mask: '999.999.999-99',
      clearIncomplete: true,
      showMaskOnHover: false,
    }).mask(cpfInputElement as HTMLInputElement);

    Inputmask({
      mask: '(99) 99999-9999',
      clearIncomplete: true,
      showMaskOnHover: false,
    }).mask(telefoneInputElement as HTMLInputElement);
  }
    async save(): Promise<void> {
      const cpfNumber = this.cpf ? parseInt(this.cpf.toString().replace(/\D/g, ''), 10) : 0;
      const telefoneNumber = this.telefone ? parseInt(this.telefone.toString().replace(/\D/g, ''), 10) : 0;
      this.loginService.update(
        this.nome,
        this.sobrenome,
        this.email,
        this.senha,
        telefoneNumber,
        cpfNumber
      );
      this.router.navigate(['/home/perfil']);
      }
}
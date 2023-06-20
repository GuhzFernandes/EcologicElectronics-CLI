import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import Inputmask from 'inputmask';
import { AlertController } from '@ionic/angular';

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
  public alterar: string = 'perfil';

  public currentPassword: string = '';
  public newPassword: string = '';
  public confirmNewPassword: string = '';

  public showCurrentPassword: boolean = false;
  public showNewPassword: boolean = false;
  public showConfirmNewPassword: boolean = false;
  

  constructor(private router: Router, private loginService: LoginService, private notification: NotificationService,private alertController: AlertController) {}

  async ngOnInit() {
    await this.loginService.getUser().then((user) => {
      this.nome = user.firstName ?? '';
      this.sobrenome = user.lastName ?? '';
      this.email = user.email ?? '';
      this.senha = user.password ?? '';
      this.telefone = user.phoneNumber;
      this.cpf = user.cpf;
    });

    this.alterar = 'perfil';

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';

    this.showCurrentPassword = false;
    this.showNewPassword = false;
    this.showConfirmNewPassword = false;
  }

  toggleCurrentPassword():void{this.showCurrentPassword === true ? this.showCurrentPassword = false : this.showCurrentPassword = true}
  toggleNewPassword():void{this.showNewPassword === true ? this.showNewPassword = false : this.showNewPassword = true}
  toggleConfirmNewPassword():void{this.showConfirmNewPassword === true ? this.showConfirmNewPassword = false : this.showConfirmNewPassword = true}
  

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
    
  async saveUser(): Promise<void> {
    const telefoneNumber = this.telefone ? parseInt(this.telefone.toString().replace(/\D/g, ''), 10) : undefined;
    const cpfNumber = this.cpf ? parseInt(this.cpf.toString().replace(/\D/g, ''), 10) : undefined;
    if(this.nome == '' || this.sobrenome == '' || this.email == ''){
      this.notification.longError('Campo obrigatório vazio!\nVerifique os campos de nome, sobrenome e email');
    }
    else{
      this.loginService.updateUser(
        this.nome,
        this.sobrenome,
        this.email,
        telefoneNumber,
        cpfNumber
      );
      this.router.navigate(['/home/perfil']);
    }
  }

  async savePassword(): Promise<void> {
    if(this.currentPassword == '' || this.newPassword == '' || this.confirmNewPassword == ''){
      this.notification.longError('Campo obrigatório vazio!\nPreencha os campos de senha atual, nova senha e confirmar nova senha.');
    }
    else if(this.newPassword != this.confirmNewPassword){
      this.notification.defaultError('Nova senha não coincide com sua confirmação!');
    }
    else if(this.senha != this.currentPassword){
      this.notification.defaultError('Senha atual incorreta, verifique a sua senha!');
    }
    else{
      this.loginService.updatePassword(this.newPassword);
      this.router.navigate(['/home/perfil']);
    }
  }
    
  async remove(): Promise<void>{
    const alert = await this.alertController.create({
      header: 'Atenção',
      subHeader: 'Deseja deletar a sua conta?',
      message: 'Essa ação é irreversivel',
      buttons: [
        { text: 'Deletar',
          role: 'destructive',
          handler: async () =>  {
            await this.loginService.remove()
              .then( () => {
                this.loginService.logout();
                this.router.navigate(['/start']);
              })
          }},
        { text: 'Cancelar',
          role: 'cancel',
          handler: () => {}},
    ],
    });
    await alert.present();
  }

}
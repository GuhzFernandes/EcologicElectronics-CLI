import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private notification: NotificationService) { }

  public email: string = '';
  public password: string = '';
  public showPassword: boolean = false;
  public keepMeLoggedIn: boolean = false;

  async ngOnInit() {
    this.email = '';
    this.password = '';
    this.showPassword = false;
    this.keepMeLoggedIn = false;
    this.loginService.checkUser()
    .then((isOk)=>{
      if(isOk){
        this.router.navigate(["/home/menu"]);
      }
    });
  }

  togglePassword():void{this.showPassword === true ? this.showPassword = false : this.showPassword = true}

  async login():Promise<void>{
    if(this.email==''){
      this.notification.defaultError('Preencha o campo de email!');
    }
    else if(this.password == ''){
      this.notification.defaultError('Preencha o campo de senha!');
    }
    else{
      this.loginService.login(this.email, this.password, this.keepMeLoggedIn)
        .then(()=>{
          this.loginService.checkUser()
            .then((isOk) =>{
              if( isOk ){
                this.router.navigate(["/home/menu"]);
      }});});
    }

  }
}
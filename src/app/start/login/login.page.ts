import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

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
    this.loginService.login(this.email, this.password, this.keepMeLoggedIn)
    .then(()=>{
      this.loginService.checkUser()
      .then((isOk) =>{
        if( isOk ){
          this.router.navigate(["/home/menu"]);
          window.location.reload();
      }});});
  }
}
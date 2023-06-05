import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
//import IUser from '../../interfaces/IUser';


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
    if(await this.loginService.checkUser()){
      this.router.navigate(["/home/menu"]);
    }
  }

  togglePassword():void{this.showPassword === true ? this.showPassword = false : this.showPassword = true}

  async login():Promise<void>{
    this.loginService.login(this.email, this.password, this.keepMeLoggedIn);
    if(await this.loginService.checkUser()){
      this.router.navigate(["/home/menu"]);
    }
  }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  public email: string = '';
  public password: string = '';
  public showPassword: boolean = false;
  public keepMeLoggedIn: boolean = false;

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.showPassword = false;
    this.keepMeLoggedIn = false;
  }

  togglePassword():void{this.showPassword === true ? this.showPassword = false : this.showPassword = true}

  login():void{this.router.navigate(["/home/menu"]);}
}
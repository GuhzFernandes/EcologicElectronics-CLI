import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  public firstName:string = '';
  public lastName:string = '';
  public email: string = '';
  public password: string = '';
  public confirmPassword:string = '';


  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public agreedTerms : boolean = false;

  ngOnInit() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.agreedTerms  = false;
  }

  togglePassword():void{this.showPassword === true ? this.showPassword = false : this.showPassword = true}
  toggleConfirmPassword():void{this.showConfirmPassword === true ? this.showConfirmPassword = false : this.showConfirmPassword = true}

  async signup():Promise<void>{
    if(this.password == this.confirmPassword){
      if(this.agreedTerms){
        this.loginService.signup(this.firstName,this.lastName,this.email,this.password);
        if(await this.loginService.checkUser()){
        this.router.navigate(["/home/menu"]);
        }
      }
      else{
        console.log('falta aceitar os termos');
      }
    }
    else{
      console.log('senhas não conferem');
    }
  }
  

}
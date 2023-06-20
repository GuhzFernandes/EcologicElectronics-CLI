import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  public email: string = '';
  
  constructor(private notification: NotificationService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.email = '';
  }

  public async checkEmail(){
    if(this.email == ''){
      this.notification.defaultError('Preencha o campo de email!');
    }
    else{
      await this.loginService.checkEmail(this.email)
      .then((check) => {
        if(check){
          this.router.navigate(["/start/forgotpassword/newpassword"]);
        }
      })
    }
  }
}

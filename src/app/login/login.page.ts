import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  showMenu(){
    this.navCtrl.navigateForward('menu')
  }


  public showPassword: boolean = false;

  ngOnInit() {
    this.showPassword = false;
  }

  togglePassword():void{this.showPassword === true ? this.showPassword = false : this.showPassword = true}
}

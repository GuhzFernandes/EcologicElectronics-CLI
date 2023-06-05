import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service'

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  constructor(private loginService: LoginService) { }

  public click: boolean = false; 
  
  ngOnInit() {
    this.click = false;
    this.loginService.startUser();
  }

  setClick(): void{
    this.click = true;
  }

}

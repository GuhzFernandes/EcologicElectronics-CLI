import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  constructor() { }

  public click: boolean = false; 
  
  ngOnInit() {
    this.click = false;
  }

  setClick(): void{
    this.click = true;
  }

}

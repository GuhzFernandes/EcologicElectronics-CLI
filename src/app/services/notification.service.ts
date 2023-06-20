import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) { }

  public async defaultMsg(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
      });
      await toast.present();
  }

  public async longMsg(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      });
      await toast.present();
  }
  
  public async defaultError(msg: string){
    const toast = await this.toastController.create({
      icon: "warning-outline",
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
      });
      await toast.present();
  }

  public async longError(msg: string){
    const toast = await this.toastController.create({
      icon: "warning-outline",
      message: msg,
      duration: 5000,
      position: 'bottom',
      color: 'danger',
      });
      await toast.present();
  }

  public async defaultSuccess(msg: string){
    const toast = await this.toastController.create({
      icon: "checkmark-outline",
      message: msg,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      });
      await toast.present();
  }

  public async longSuccess(msg: string){
    const toast = await this.toastController.create({
      icon: "checkmark-outline",
      message: msg,
      duration: 5000,
      position: 'bottom',
      color: 'success',
      });
      await toast.present();
  }

}

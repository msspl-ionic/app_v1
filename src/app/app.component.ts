import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private network:Network, public alertController: AlertController, private device: Device) {
    window.addEventListener('offline', ()=>{
      this.openalert();
    });

   
  //  this.getDeviceInfo();

  }

  async openalert(){
    const alert = await this.alertController.create({
      header: 'Check network connection',
      message: 'You do not have internet connection',
      buttons:[{
        text: 'Ok',
        handler: ()=>{
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
  }

  async getDeviceInfo(){
    let deviceDetails = 
    `Device UUID: ${this.device.uuid} 
    Version : ${this.device.version} 
    Platform : ${this.device.platform} 
    Model : ${this.device.model}
    `;
    alert(deviceDetails);
  }
  
}

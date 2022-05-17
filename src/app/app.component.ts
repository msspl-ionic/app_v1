import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private network:Network, public alertController: AlertController) {
    window.addEventListener('offline', ()=>{
      this.openalert();
    })
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
}

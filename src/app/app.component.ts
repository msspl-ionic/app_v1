import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './shared/services/auth.service';
import { CommonService } from './shared/services/common.service';
import { environment } from '@env/environment';

import {
	ActivatedRoute,
	NavigationCancel,
	NavigationError,
	NavigationStart,
	Router
} from '@angular/router';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(private _router: Router,private authService: AuthService, private storage: Storage,private network:Network, public alertController: AlertController, private device: Device,  private plt: Platform, private common: CommonService) {

    this.plt.ready().then(() => {
      this.checkToken();
    });
    
    // const isLoggedIn = this.authService.isAuthenticated();
    // console.log(isLoggedIn);
    // if(isLoggedIn == false){
    //   this._router.navigate(['/login']);
    // }
    window.addEventListener('offline', ()=>{
      this.openalert();
    });

   
  //  this.getDeviceInfo();

  }

  checkToken() {
    this.storage.get(environment.TOKEN_KEY).then(token => {
      if (token) {
        this.common.authenticationState.next(true);
        
      }else{
        this.common.authenticationState.next(false);
      }
    });
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
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

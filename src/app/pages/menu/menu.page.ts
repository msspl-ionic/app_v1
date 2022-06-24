import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { IonModal } from '@ionic/angular';
import { environment } from '@env/environment';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private subscriptions: Subscription[] = [];
  @ViewChild(IonModal) modal: IonModal;
  constructor(private common: CommonService, private _router: Router,private service: ApiService, private storage: Storage) { }
  public userDtls:  any = {};
  public userDtlsb:  any = {};
  ngOnInit() {
    
    // this.common.authenticationState.subscribe((data:any) => {
        
    //   if (this.common.isAuthenticated()) {
    //     console.log(data);
    //     if(data == undefined){
    //       setTimeout(function () {
    //            // authorised so return true
    //           this.userDetails();
    //       }, 4000);
    //     }else{
    //       setTimeout(function () {
    //         this.userDetails();
    //       }, 4000);
    //     }
          
    //   }
       
    //     // authorised so return true
    //     // this.userDetails();
      
    // });
    
      // authorised so return true
     this.userDetails();

    
    // this.detUser();
  }

  ngAfterViewInit() {
    
  }

  logOut(){
    console.log('ok');
    this.common.logout();
    this.modal.dismiss();
  }


  userDetails() {
		let param: any = {
      lang_name:2,
      device_os:"and",
      appversion: "1.0.0"
    };    
    // return;
		this.subscriptions.push(this.service.ApiCall(param, `user/detail`, 'POST').subscribe(result => {
      console.log(result,"result")
      // this.storage.get("UserDeatils").then(usrdtls => {
      //   console.log(usrdtls,"token")
      //   this.userDtlsb = usrdtls;
      // });
      
      this.userDtls = result.response.data

		}, apiError => {
        console.log('API error');
		}))
	}

  // detUser() {
  //   this.storage.get("UserDeatils").then(usrdtls => {
  //     this.userDtlsb = usrdtls;
  //     console.log(this.userDtlsb,"pop")
  //   });
  // }

}

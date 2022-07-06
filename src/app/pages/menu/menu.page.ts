import { Component, OnInit,ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
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
  public userDtls:  any = {};
  public userDtlsb:  any = {};
  public profileDetails:  any = {};
  selectedIndex: number = 1;

  constructor(private common: CommonService, private _router: Router,private service: ApiService, private storage: Storage) {
    this._router.events.subscribe(
      (event: NavigationEnd) => {
        if(event instanceof NavigationStart) {
          this.selectedIndex = 1;
          if(event.url == '/tabs/shop-by-category'){
              this.selectedIndex = 2;
          }else if(event.url == '/tabs/featuredproducts'){
            this.selectedIndex = 3;
          }
        }
    });
    
  }
  

  ngOnInit() {
    
    this.common.authenticationState.subscribe((data:any) => {
      // authorised so return true  
      if (this.common.isAuthenticated()) {
        this.storage.get(environment.TOKEN_KEY).then(token => {
          console.log(token);
          this.userDetails();
        });
        
      }
      
    });

    this.common._onProfileDataAll$.subscribe((data)=>{
      if(data) {
        console.log(data);
        this.profileDetails = data;
      }
    })


    
    
    
    // this.detUser();
  }

  ngAfterViewInit() {
    
  }

  setIndex(index: number) {
    this.selectedIndex = index;
  }

  logOut(){
    console.log('ok');
    this.common.logout();
    this.modal.dismiss();
    // this.common._onTabAll$.subscribe((data)=>{
    //   if(data) {
    //    console.log(data,"data")
    //   }
    // })
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
      
      this.userDtls = result.response.data;
      this.common.setProfileData(this.userDtls);

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

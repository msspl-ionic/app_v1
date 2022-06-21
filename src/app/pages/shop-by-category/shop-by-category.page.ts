import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { AlertController } from '@ionic/angular';
// import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.page.html',
  styleUrls: ['./shop-by-category.page.scss'],
})
export class ShopByCategoryPage implements OnInit {
  private subscriptions: Subscription[] = [];

  constructor(
    private _router: Router,
    private service: ApiService,
    private common: CommonService,
    private alertController: AlertController,
    // private storage: Storage
  ) { }

  ngOnInit() {
    /* Get category list */
    // this.storage.get(environment.TOKEN_KEY).then(token => {
		// 	if (token) {
		// 		this.getCategory();
		// 	}
		// });
    this.getCategory();
    // console.log(this.common.getToken());
  }



  getCategory(){
    let param: any = {};
		param['lang_name'] = 1; //1 => For portugese; 2 => For english;
		param['appversion'] = '1.0.0';
		param['device_os'] = 'and'; //and => For Android; ios => For ios;
		param['parent_cat_id'] = 0; // send 0 to get only category list; Send parent category id to get its sub categories list;

		this.subscriptions.push(this.service.ApiCall(param, `category/list`, 'POST').subscribe(result => {
      console.log(result);
     
		}, async apiError => {
      console.log(apiError);
        // let  alert =  await this.alertController.create({
        //   header: 'Error',
        //   message: apiError.error.response.status.msg,
        //   buttons: [{
        //         text: 'Ok'
        //       }]
        // });
        // await alert.present();
        // console.log(apiError.error.response.status.msg);
		}))
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-featuredproducts',
  templateUrl: './featuredproducts.page.html',
  styleUrls: ['./featuredproducts.page.scss'],
})
export class FeaturedproductsPage implements OnInit {
  private subscriptions: Subscription[] = [];
  public catFeaturedProductArr: any;
  public priceVal : any;
  public sellPrice : any;

  constructor(
    private _router: Router,
    private service: ApiService,
    private common: CommonService,
    private alertController: AlertController,
  ) { 
    
  }

  ngOnInit() {
    this.getFeaturedproducts();
  }

  getFeaturedproducts(){
    let param: any = {};
		param['lang_name'] = 1; //1 => For portugese; 2 => For english;
		param['appversion'] = '1.0.0';
		param['device_os'] = 'and'; //and => For Android; ios => For ios;
		param['list_type'] = 1; // send 0 to get only category list; Send parent category id to get its sub categories list;

		this.subscriptions.push(this.service.ApiCall(param, `product/bestfeaturedproduct`, 'POST').subscribe(result => {
      // console.log(result.response.data);
      // console.warn(result.response.data.featured_product);
      this.catFeaturedProductArr = result.response.data.featured_product;
     
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
  valCheck(evt,id) {
    // console.log(evt,id)
    // console.log(evt.sell_price);
    // this.sellPrice = evt.sell_price
    // // this.priceVal = evt;
    // console.log(evt,this.priceVal);
    
    
  }

}

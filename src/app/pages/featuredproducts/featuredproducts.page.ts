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
  public featuredProductList: any;
  public priceVal : any = {};
  public sellPrice = '';
  public discountPrice = '';

  constructor(
    private _router: Router,
    private service: ApiService,
    private common: CommonService,
    private alertController: AlertController,
  ) { 
    
  }

  ngOnInit() {
    this.getFeaturedproducts();
    // this.featuredProduct(2);
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
      // this.catFeaturedProductArr = result.response.data.featured_product;
      this.featuredProductList = result.response.data.featured_product;

      for (let i = 0; i < this.featuredProductList.length; i++) {
        this.featuredProductList[i]['default_sell_price'] = this.featuredProductList[i].variation[0].sell_price;
        this.featuredProductList[i]['default_discount_price'] = this.featuredProductList[i].variation[0].discount_price;
        this.featuredProductList[i]['default_quantity'] = this.featuredProductList[i].variation[0].quantity;
        this.featuredProductList[i]['default_unit'] = this.featuredProductList[i].variation[0].unit;
      }
     
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
  handleChangeFeatured(ev,item) {   
    this.sellPrice = ev.target.value.sell_price
    item.default_sell_price = this.sellPrice;
    this.discountPrice = ev.target.value.discount_price
    item.default_discount_price = this.discountPrice;
  }

}

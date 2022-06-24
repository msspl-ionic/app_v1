import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  
  private subscriptions: Subscription[] = [];
  public productListArr: any;
  public priceVal : any;
  public sellPrice : any;
  public category_id : any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private service: ApiService,
    private common: CommonService,
    private alertController: AlertController,
  ) { 
    this.category_id = this._route.snapshot.params['id']
    console.log(this._route.snapshot.params['id'])
    
    
  }

  ngOnInit() {
    this.getFeaturedproducts();
  }

  getFeaturedproducts(){
    // let param: any = {};
		// param['lang_name'] = 1; //1 => For portugese; 2 => For english;
		// param['appversion'] = '1.1.2';
		// param['device_os'] = 'and'; //and => For Android; ios => For ios;
		// param['cat_id'] = 1; // send 0 to get only category list; Send parent category id to get its sub categories list;
    // param['cat_type'] = 'parentcat';

    let param: any = {
      lang_name:1,
      device_os:'and',
      appversion:'1.1.2',
      cat_id:this.category_id,
      cat_type:'parentcat', //'parentcat' for main category; 'subcat' for main subcategory;
      first: 0,
      rows: 10,
      sortField: '', //price,name,discount
      sortOrder: 1, // 1 for Ascending; 2 for Descending;
      filters: {
          brand: {
              value: []
          },
          price: {
              value : []
          },
          discount: {
              value : []
          },
          size: {
              value: []
          }
      }
  }
		this.subscriptions.push(this.service.ApiCall(param, `product/list`, 'POST').subscribe(result => {
      // console.log(result.response.data);
      console.warn(result);
      this.productListArr = result.response.data.product_list;
     
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

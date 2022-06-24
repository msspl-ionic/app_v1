import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
interface User {
  id: number;
  first: string;
  last: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private subscriptions: Subscription[] = [];
  constructor(private service: ApiService) { }
  public categoryListArr:  any = [];
  public featuredProductList: any = [];
  public priceVal : any = {};
  public sellPrice : any = {};
  users: User[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    },
    {
      id: 3,
      first: 'Charlie',
      last: 'Rosenburg',
    }
  ];


  ngOnInit() {
    this.categoryList();
    this.featuredProduct();
  }
  // slider jayanta
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay:true
  };

  featuredSlide = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay:true
  };

  // slider jayanta



  categoryList() {
		let param: any = {
      parent_cat_id :0,
      lang_name:2,
      device_os:"ios"
    };    
    // return;
		this.subscriptions.push(this.service.ApiCall(param, `category/list`, 'POST').subscribe(result => {
      this.categoryListArr = result.response.data.category_list;

		}, apiError => {
        console.log('API error');
		}))
	}

  featuredProduct() {
		let param: any = {
      lang_name:2,
      device_os:"ios",
      list_type:1
    };    
    // return;
		this.subscriptions.push(this.service.ApiCall(param, `product/bestfeaturedproduct`, 'POST').subscribe(result => {
      this.featuredProductList = result.response.data.featured_product;
      console.log(result,"result")
      // function 
      for (let i = 0; i < this.featuredProductList.length; i++) {
        this.featuredProductList[i]['default_sell_price'] = this.featuredProductList[i].variation[0].sell_price;
        this.featuredProductList[i]['default_discount_price'] = this.featuredProductList[i].variation[0].discount_price;
        this.featuredProductList[i]['default_quantity'] = this.featuredProductList[i].variation[0].quantity;
        this.featuredProductList[i]['default_unit'] = this.featuredProductList[i].variation[0].unit;        
      }
      console.log(this.featuredProductList)

		}, apiError => {
        console.log('API error');
		}))
	}
  valCheck(evt) {
    console.log(evt);
    this.sellPrice = evt.sell_price;
    
    console.log(this.sellPrice,"this.sellPrice")
    // console.log(evt.sell_price);
    // this.sellPrice = evt.sell_price
    // // this.priceVal = evt;
    // console.log(evt,this.priceVal);
    
    
  }


  // compareWith(o1: User, o2: User) {
  //   return o1 && o2 ? o1.id === o2.id : o1 === o2;
  // }
  

}

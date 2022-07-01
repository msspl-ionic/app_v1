import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
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
  public sellPrice = '';
  public discountPrice = '';
  public bestSellersProductList: any = [];
  public snacksBranded: any = [];
  


  ngOnInit() {
    this.categoryList();
    this.featuredProduct(1);
    this.featuredProduct(2);
    // this.dashboarsProduct();
    console.log('hello');

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

  featuredProduct(type:1|2) {
		let param: any = {
      lang_name:2,
      device_os:"ios",
      list_type:type
    };    
    // return;
		this.subscriptions.push(this.service.ApiCall(param, `product/bestfeaturedproduct`, 'POST').subscribe(result => {
      if(param.list_type == 1){
        this.featuredProductList = result.response.data.featured_product;
      }else{
        this.bestSellersProductList= result.response.data.bestseller_product;
      }

      // function 

      for (let i = 0; i < this.featuredProductList.length; i++) {
        this.featuredProductList[i]['default_sell_price'] = this.featuredProductList[i].variation[0].sell_price;
        this.featuredProductList[i]['default_discount_price'] = this.featuredProductList[i].variation[0].discount_price;
        this.featuredProductList[i]['default_quantity'] = this.featuredProductList[i].variation[0].quantity;
        this.featuredProductList[i]['default_unit'] = this.featuredProductList[i].variation[0].unit;       
      }

      for (let i = 0; i < this.bestSellersProductList.length; i++) {
        this.bestSellersProductList[i]['default_sell_price'] = this.bestSellersProductList[i].variation[0].sell_price;
        this.bestSellersProductList[i]['default_discount_price'] = this.bestSellersProductList[i].variation[0].discount_price;
        this.bestSellersProductList[i]['default_quantity'] = this.bestSellersProductList[i].variation[0].quantity;
        this.bestSellersProductList[i]['default_unit'] = this.bestSellersProductList[i].variation[0].unit;       
      }
		}, apiError => {
        console.log('API error');
		}))
	}

  handleChangeFeatured(ev,item) {   
    this.sellPrice = ev.target.value.sell_price
    item.default_sell_price = this.sellPrice;
    this.discountPrice = ev.target.value.discount_price
    item.default_discount_price = this.discountPrice;
  }


  handleChangeBestsellers(ev,item) {   
    this.sellPrice = ev.target.value.sell_price
    item.default_sell_price = this.sellPrice;
    this.discountPrice = ev.target.value.discount_price
    item.default_discount_price = this.discountPrice;
  }



  // dashboarsProduct() {
	// 	let param: any = {
  //     lang_name:2,
  //     device_os:"ios"
  //   };    
  //   // return;
	// 	this.subscriptions.push(this.service.ApiCall(param, `category/dashboardproducts`, 'POST').subscribe(result => {      
  //     this.snacksBranded = result.response.data;
  //     console.log(this.snacksBranded,"this.snacksBranded")
	// 	}, apiError => {
  //       console.log('API error');
	// 	}))
	// }


  
  

}

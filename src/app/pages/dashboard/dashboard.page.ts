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
  constructor(private service: ApiService,) { }

  ngOnInit() {
    this.categoryList();
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
      device_os:"and"
    };
    
		console.log(param);
    // return;
		this.subscriptions.push(this.service.ApiCall(param, `category/list`, 'POST').subscribe(result => {
      console.log(result);

		}, apiError => {
        console.log('API error');
		}))
	}

}

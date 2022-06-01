import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
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

}

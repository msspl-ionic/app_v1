import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private common: CommonService, private _router: Router) { }

  ngOnInit() {

  }

  logOut(){
    console.log('ok');
    this.common.logout();
  }

}

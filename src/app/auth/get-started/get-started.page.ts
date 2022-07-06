import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {

  constructor(private common: CommonService, private _router: Router) { }

  ngOnInit() {
    // this._router.navigate(['tabs/dashboard']);
    this.common._onProfileDataAll$.subscribe((data)=>{
      if(data) {
        this._router.navigate(['tabs/dashboard']);
      }
    })
  }

}

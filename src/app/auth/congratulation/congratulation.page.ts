import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.page.html',
  styleUrls: ['./congratulation.page.scss'],
})
export class CongratulationPage implements OnInit {

  constructor(
    private _route: Router
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._route.navigate(['/login']);
		},3000);
  }

}

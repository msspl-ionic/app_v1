import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  countries = [
    {
      id:1,
      code: '+91', 
      country:'India',
      flag: ['http://localhost:8100/assets/images/countryimg.png'],
    },
  ]
  constructor() {}

  ngOnInit() {
  }

  
 
}

import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
// import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  
  @ViewChild('myForm') public myForm!: FormGroupDirective;
  signupForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  // public fullLocation: any;

  // title: string = 'AGM project';
  // latitude: number = 47.176418;
  // longitude: number = 5.614490;
  // zoom: number;
  // address: string;
  // private geoCoder;
  // @ViewChild('search',{static:false})
  // public searchElementRef: ElementRef;

  constructor(
    private _router: Router,
	private fb: FormBuilder,
    private service: ApiService,
	private common: CommonService,
    private storage: Storage,
	private alertController : AlertController
  ) {
	
   }

  // get a key/value pair
  
  
  ngOnInit() {
    this.createForm();
  }

  	createForm() {
		this.signupForm = this.fb.group({
			shop_name: ['', [Validators.required]],
			vendor_name: ['', [Validators.required]],
			phone_no: ['', [Validators.required]],
			email_id: ['', [Validators.required]],
		})
	}

  	get formControl() {
		return this.signupForm.controls;
	}

	submitForm() {
		if (this.signupForm.invalid) {
			return;
		}
		let param: any = {};

		console.log(param);
    // return;
		this.subscriptions.push(this.service.ApiCall(param, `user/updateprofile`, 'POST').subscribe(result => {
      	console.log(result);

		/* Update storage for otp submittion */
		// this.storage.set(environment.REGISTER_NUMBER, param.phone_no);
		// this.common._onUpdatePhoneSubject.next(param.phone_no);

		this.myForm.resetForm();

		}, async apiError => {
			let  alert =  await this.alertController.create({
				header: 'Error',
				message: apiError.error.response.status.msg,
				buttons: [{
					  text: 'Ok'
					}]
			  });
			await alert.present();
		}))
	}


	
}

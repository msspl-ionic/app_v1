import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('myForm') public myForm!: FormGroupDirective;
  signupForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  public profileDetails:  any = {};
  constructor(
		private _router: Router,
		private fb: FormBuilder,
		private service: ApiService,
	  private common: CommonService,
   		private storage: Storage,
	  private alertController : AlertController
  ) { }

  ngOnInit() {
    this.createForm();
	this.common._onProfileDataAll$.subscribe((data)=>{
		if(data) {
			console.log(data,"abbvb")
			this.profileDetails = data;
			console.log(this.profileDetails,"abbvb")
			this.getProfileData();
		}

	})
	
  }
  createForm() {
		this.signupForm = this.fb.group({
			shop_name: ['', [Validators.required]],
			vendor_name: ['', [Validators.required]],
			phone_no: ['', [Validators.required]],
			email_id: ['', [Validators.required]],
			tax_id: ['', '']
		})

		
	}

	getProfileData() {
		console.log(this.profileDetails,"this.profileDetails")
		this.signupForm.patchValue({
			shop_name: this.profileDetails.shop_name,
			vendor_name: this.profileDetails.customer_name,
			phone_no: this.profileDetails.phone,
			email_id: this.profileDetails.email,
			tax_id: this.profileDetails.tax_id
			// empCode: profileData.emp_code
		});

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

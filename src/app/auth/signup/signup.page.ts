import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('myForm') public myForm!: FormGroupDirective;
  signupForm!: FormGroup;
  private subscriptions: Subscription[] = [];
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
		param = this.signupForm.value;
		param['city'] = 'kolkata';
		param['state'] = 'WB';
		param['address1'] = 'Newtown, kolkata';
		param['address2'] = 'kolkata';
		param['pincode'] = '700013';
		param['country'] = 'India';
		// param['latitude'] = 'kolkata';
		// param['longitude'] = 'kolkata';
		param['tax_id'] = 'TX1234';
		// param['device_os'] = 'kolkata';
		// param['appversion'] = 'kolkata';

		console.log(param);
    // return;
		this.subscriptions.push(this.service.ApiCall(param, `user/register`, 'POST').subscribe(result => {
      	console.log(result);

		/* Update storage for otp submittion */
		this.storage.set(environment.REGISTER_NUMBER, param.phone_no);
		this.common._onUpdatePhoneSubject.next(param.phone_no);

		this.myForm.resetForm();
      	this._router.navigate(['/congratulation']);

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

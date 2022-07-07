import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('myForm') public myForm!: FormGroupDirective;
  signupForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  public fullLocation: any;
  public fullAddress: any;
  showMap:boolean = false;

  title: string = 'AGM project';
  latitude: number = -8.838333;
  longitude: number = 13.234444;
  address1: string = 'Cassenda';
  address2: string = '';
  pincode: string = '';

  city: string = 'Luanda';
  state: string = 'Angola';
  zoom: number = 14;
  address: string;
  @ViewChild('search') search: AgmMap;
  public searchElementRef: ElementRef;

  constructor(
    private _router: Router,
	private fb: FormBuilder,
    private service: ApiService,
	private common: CommonService,
    private storage: Storage,
	private alertController : AlertController,
	private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
	private device: Device,
  ) {

   }

  // get a key/value pair
  
  
  ngOnInit() {
	  
    // this.getDeviceInfo();
    this.createForm();
	this.common.onUpdateLocation$.subscribe((data:any) => {
		if(data) {
			this.fullLocation = data.location;
			this.address1 = this.fullLocation.street_1;
			this.address2 = this.fullLocation.street_2;
			this.pincode = this.fullLocation.Zip;
			this.latitude = data.latitude;
			this.longitude = data.longitude;
			this.fullAddress = (this.fullLocation.street_1 + "," + (this.fullLocation.street_2 !='' ? this.fullLocation.street_2 + "," : '')  + this.fullLocation.City + "," + this.fullLocation.State + ((this.fullLocation.Zip !='' && this.fullLocation.Zip !=null) ?  "," + this.fullLocation.Zip : ''));
		
		}
	});

	setTimeout(() => {
		this.showMap = true;
	}, 100);

	
  }

	// async getDeviceInfo(){
	// 	let deviceDetails = 
	// 	`Device UUID: ${this.device.uuid} 
	// 	Version : ${this.device.version} 
	// 	Platform : ${this.device.platform} 
	// 	Model : ${this.device.model}
	// 	`;
	// 	alert(deviceDetails);
	// }

  	createForm() {
		this.signupForm = this.fb.group({
			shop_name: ['', [Validators.required]],
			vendor_name: ['', [Validators.required]],
			phone_no: ['', [Validators.required]],
			email_id: ['', [Validators.required]],
			tax_id: ['']
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
		param['city'] = this.city;
		param['state'] = this.state;
		param['address1'] = this.address1;
		param['address2'] = this.address2;
		param['pincode'] = this.pincode;
		param['country'] = this.state;
		param['latitude'] = this.latitude;
		param['longitude'] = this.longitude;
		param['device_os'] = this.device.platform;
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

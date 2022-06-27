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

  title: string = 'AGM project';
  latitude: number = -8.838333;
  longitude: number = 13.234444;
  city: string = 'Luanda';
  state: string = 'Angola';
  zoom: number = 12;
  address: string;
  private geoCoder;
  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;

  constructor(
    private _router: Router,
	private fb: FormBuilder,
    private service: ApiService,
	private common: CommonService,
    private storage: Storage,
	private alertController : AlertController,
	private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
	
   }

  // get a key/value pair
  
  
  ngOnInit() {
    this.createForm();

	this.common.onUpdateLocation$.subscribe((data:any) => {
		this.fullLocation = data;
	});

	console.warn(this.fullLocation);
	
	//load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
	// 	this.setCurrentLocation();
	// 	this.geoCoder = new google.maps.Geocoder;
	// 	// console.log(this.geoCoder);
	// 	// return;
	// 	let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
	// 	  types: ["address"]
	// 	});
	// 	console.log(autocomplete);
	// 	autocomplete.addListener("place_changed", () => {
	// 	  this.ngZone.run(() => {
	// 		//get the place result
	// 		let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
	// 		//verify result
	// 		if (place.geometry === undefined || place.geometry === null) {
	// 		  return;
	// 		}
  
	// 		//set latitude, longitude and zoom
	// 		this.latitude = place.geometry.location.lat();
	// 		this.longitude = place.geometry.location.lng();
	// 		this.zoom = 6;
	// 	  });
	// 	});
	// });
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


	// Get Current Location Coordinates
	private setCurrentLocation() {
		if ('geolocation' in navigator) {
		  navigator.geolocation.getCurrentPosition((position) => {
			this.latitude = position.coords.latitude;
			this.longitude = position.coords.longitude;
			this.zoom = 8;
			// this.getAddress(this.latitude, this.longitude);
		  });
		}
	  }
	
	
	  markerDragEnd($event: any) {
		console.log($event);
		this.latitude = $event.coords.lat;
		this.longitude = $event.coords.lng;
		console.log(this.latitude, this.longitude);
		// this.getAddress(this.latitude, this.longitude);
	  }
	
	  getAddress(latitude, longitude) {
		this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
		  console.log(results);
		  console.log(status);
		  if (status === 'OK') {
			if (results[0]) {
			  this.zoom = 12;
			  this.address = results[0].formatted_address;
			} else {
			  window.alert('No results found');
			}
		  } else {
			window.alert('Geocoder failed due to: ' + status);
		  }
	
		});
	  }

}

import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-set-location',
  templateUrl: './set-location.page.html',
  styleUrls: ['./set-location.page.scss'],
})
export class SetLocationPage implements OnInit {
	@ViewChild('myForm') public myForm!: FormGroupDirective;
	signupForm!: FormGroup;
	public fullLocation: any;
	public mapLat: any;
	public mapLong: any;
	showMap:boolean = false;

    title: string = 'AGM project';
    latitude: number = -8.838333;
    longitude: number = 13.234444;
	city: string = 'Luanda';
	state: string = 'Angola';
    zoom: number = 14;
    address: string;
    private geoCoder;
    @ViewChild('search',{static:false})
    public searchElementRef: ElementRef;
	API_KEY: string = 'AIzaSyA2PzMpPb4MiHkux7cmlRZlHf_728FBZRg';
	confirmDisable: boolean = true;

	constructor(
		private _router: Router,
		private fb: FormBuilder,
		private service: ApiService,
		private common: CommonService,
		private storage: Storage,
		private alertController : AlertController,
		private mapsAPILoader: MapsAPILoader,
		private ngZone: NgZone,
	) {

		this._router.events.subscribe(
		(event: NavigationEnd) => {
			if(event instanceof NavigationStart) {
				if(event.url == '/set-location'){
					this.common.onUpdateLocation$.subscribe((data:any) => {
						console.log(data)
						if(data !=null) {
							this.confirmDisable = false;
							this.fullLocation = data.location;
							// this.latitude = this.fullLocation.latitude;
							// this.longitude = this.fullLocation.longitude;
							this.signupForm.patchValue({
								street_1: this.fullLocation.street_1,
								street_2: this.fullLocation.street_2,
								Zip: this.fullLocation.Zip
					
							});	
							// console.log( data.location.latitude,this.latitude, this.longitude)
							// this.submitForm('Locate');		
						}
					});
				}
			}
		});
	 }

	ngOnInit() {
		this.createForm();
		//load Places Autocomplete
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
		this.common.onUpdateLocation$.subscribe((data:any) => {
			// console.log(data)
			if(data !=null) {
				this.confirmDisable = false;
				this.fullLocation = data.location;
				// this.latitude = this.fullLocation.latitude;
				// this.longitude = this.fullLocation.longitude;
				this.signupForm.patchValue({
					street_1: this.fullLocation.street_1,
					street_2: this.fullLocation.street_2,
					Zip: this.fullLocation.Zip
		
				});	
				// console.log( data.location.latitude,this.latitude, this.longitude)
				// this.submitForm('Locate');		
			}
		});

		setTimeout(() => {
			this.showMap = true;
		}, 100);
	}

   	getCoordinates(address){
	fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key='+this.API_KEY)
	  .then(response => response.json())
	  .then(data => {
		this.latitude = data.results[0].geometry.location.lat;
		this.longitude = data.results[0].geometry.location.lng;
	  })
  	}

  	createForm() {
		this.signupForm = this.fb.group({
			street_1: ['', [Validators.required]],
			street_2: [''],
			City: [this.city, [Validators.required]],
			State: [this.state, [Validators.required]],
			Zip: [''],
		});
	}

  	get formControl() {
		return this.signupForm.controls;
	}

  	submitForm(buttonType): void {
		
		if (this.signupForm.invalid) {
			return;
		}
		
		
		// console.log(buttonType); return;
		/* Update latitude & longitude */
		this.getCoordinates(this.signupForm.value.street_1 + "," + this.city + "," + this.state);
		// console.warn(this.signupForm.value);
		
		let locationParam:any = {};
		this.fullLocation = this.signupForm.value;
		setTimeout(() => {
			// set a key/value
			locationParam.location = this.fullLocation;
			locationParam.latitude = this.latitude;
			locationParam.longitude = this.longitude;
			this.common._onUpdateLocation.next(locationParam);
			this.confirmDisable = false;
		}, 500);
		
		// this.myForm.resetForm();
		if(buttonType == 'Confirm'){
			this._router.navigate(['/signup']);
			return;
		}
		
	}


  	// Get Current Location Coordinates
	private setCurrentLocation() {
		if ('geolocation' in navigator) {
		  navigator.geolocation.getCurrentPosition((position) => {
			this.latitude = position.coords.latitude;
			this.longitude = position.coords.longitude;
			this.zoom = 12;
			this.getAddress(this.latitude, this.longitude);
		  });
		}
	  }
	
	
	markerDragEnd($event: any) {
		console.log($event);
		this.latitude = $event.coords.lat;
		this.longitude = $event.coords.lng;
		this.getAddress(this.latitude, this.longitude);
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

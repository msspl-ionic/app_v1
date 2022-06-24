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
  selector: 'app-set-location',
  templateUrl: './set-location.page.html',
  styleUrls: ['./set-location.page.scss'],
})
export class SetLocationPage implements OnInit {
  @ViewChild('myForm') public myForm!: FormGroupDirective;
  signupForm!: FormGroup;
  public fullLocation: any;

    title: string = 'AGM project';
    latitude: number = 47.176418;
    longitude: number = 5.614490;
    zoom: number;
    address: string;
    private geoCoder;
    // @ViewChild('search',{static:false})
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
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
		this.signupForm = this.fb.group({
			street_1: ['', [Validators.required]],
			street_2: [''],
			City: ['', [Validators.required]],
			State: ['', [Validators.required]],
			Zip: ['', [Validators.required]],
		})
	}

  	get formControl() {
		return this.signupForm.controls;
	}

  submitForm() {
		if (this.signupForm.invalid) {
			return;
		}
    // console.warn(this.signupForm.value);
    this.fullLocation = this.signupForm.value.street_1 + "," + this.signupForm.value.street_2 + "," + this.signupForm.value.City + "," + this.signupForm.value.State + "," + this.signupForm.value.Zip;
    console.warn(this.fullLocation);
    // set a key/value
    this.common._onUpdateLocation.next(this.fullLocation);
    this.myForm.resetForm();
    this._router.navigate(['/signup']);
  }


  // Get Current Location Coordinates
	private setCurrentLocation() {
		if ('geolocation' in navigator) {
		  navigator.geolocation.getCurrentPosition((position) => {
			this.latitude = position.coords.latitude;
			this.longitude = position.coords.longitude;
			this.zoom = 8;
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

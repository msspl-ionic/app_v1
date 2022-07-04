import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { PhotoService } from '../../shared/services/photo.service';

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
  public profileImage: string = '';
  constructor(
		private _router: Router,
		private fb: FormBuilder,
		private service: ApiService,
	  	private common: CommonService,
   		private storage: Storage,
	  	private alertController : AlertController,
		public loadingController: LoadingController,
		public photoService: PhotoService
  ) { }

  ngOnInit() {
	this.photoService.loadSaved();
	
    this.createForm();
	this.common._onProfileDataAll$.subscribe((data)=>{
		if(data) {
			this.profileDetails = data;
			this.getProfileData();
		}
	})
	
  }

  async addPhotoToGallery() {
	// let profileImageResponse = 
	await this.photoService.addNewToGallery().then(data => {
		this.profileImage = (data.base64Image !='') ? data.base64Image : '';
	});
	
  }


  createForm() {
		this.signupForm = this.fb.group({
			shop_name: ['', [Validators.required]],
			customer_name: ['', [Validators.required]],
			phone: ['', [Validators.required]],
			email: ['', [Validators.required]],
			tax_id: ['', '']
		})
		
	}

	getProfileData() {
		this.signupForm.patchValue({
			shop_name: this.profileDetails.shop_name,
			customer_name: this.profileDetails.customer_name,
			phone: this.profileDetails.phone,
			email: this.profileDetails.email,
			tax_id: this.profileDetails.tax_id
			// empCode: profileData.emp_code
		});

	}

  	get formControl() {
		return this.signupForm.controls;
	}

	submitForm() {
		console.log("hhh")
		if (this.signupForm.invalid) {
			return;
		}
		const formValue = this.signupForm.value;
		let param: any = {};
		param = {
			shop_name: formValue.shop_name,
			customer_name: formValue.customer_name,
			phone: formValue.phone,
			email: formValue.email,
			tax_id: formValue.tax_id,
			device_os: 'and',
			lang_name:2,
			appversion:'1.0.0',
			image: (this.profileImage !='') ? this.profileImage : ''
		};
		console.log(param)
    return;
		this.subscriptions.push(this.service.ApiCall(param, `user/updateprofile`, 'POST').subscribe(result => {
			this.presentLoadingWithOptions();
		//this.myForm.resetForm();
		
		// setTimeout(() => {
			this._router.navigate(['tabs/dashboard']);
		//   }, 2000)
		this.common.setProfileData(this.signupForm.value);
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

	async presentLoadingWithOptions() {
		const loading = await this.loadingController.create({
		  spinner: "circles",
		  duration: 1000,
		  message: 'Please wait...',
		  translucent: true,
		  cssClass: 'custom-class custom-loading'
		});
		return await loading.present();
	  }
}

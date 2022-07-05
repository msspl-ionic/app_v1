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
import { DomSanitizer } from '@angular/platform-browser';

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
	public profileImage: any = '';
	constructor(
			private _router: Router,
			private fb: FormBuilder,
			private service: ApiService,
			private common: CommonService,
			private storage: Storage,
			private alertController : AlertController,
			public loadingController: LoadingController,
			public photoService: PhotoService,
			private _sanitizer: DomSanitizer
	) { 

	}

	ngOnInit() {
		// this.photoService.loadSaved();
		
		this.createForm();
		this.loadMenuModule();
	}

	loadMenuModule(){
		this.common._onProfileDataAll$.subscribe((data)=>{
			if(data) {
				this.profileDetails = data;
				this.photoService.photos = [];
				if(this.profileDetails.profile_image != ''){
					this.photoService.photos.push({
						filepath: '',
						webviewPath: this.profileDetails.profile_image
					});
				}
				// this.profileDetails.profile_image;
				// console.log(this.photoService);
				this.getProfileData(this.profileDetails.profile_image);
			}
		});
	}

	async addPhotoToGallery() {
		// let profileImageResponse = 
		await this.photoService.addNewToGallery().then(data => {
			// console.log(data.base64Image);
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

	getProfileData(profile_image:any) {
		this.signupForm.patchValue({
			shop_name: this.profileDetails.shop_name,
			customer_name: this.profileDetails.customer_name,
			phone: this.profileDetails.phone,
			email: this.profileDetails.email,
			tax_id: this.profileDetails.tax_id,
			profile_iamge: profile_image
			// empCode: profileData.emp_code
		});
	}

  	get formControl() {
		return this.signupForm.controls;
	}

	dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

	submitForm() {
		
		if (this.signupForm.invalid) {
			return;
		}
		const formValue = this.signupForm.value;
		// console.log(this.profileImage);
		if(this.profileImage != ''){
			this.profileImage = this.dataURLtoFile(this.profileImage,new Date()+'profile.jpeg');
		}
		const formData: FormData = new FormData();
		formData.append('shop_name', formValue.shop_name);
		formData.append('customer_name', formValue.customer_name);
		formData.append('phone', formValue.phone);
		formData.append('email', formValue.email);
		formData.append('tax_id', formValue.tax_id);
		formData.append('device_os', 'and');
		formData.append('lang_name', '2');
		formData.append('appversion', '1.0.0');
		formData.append('image', this.profileImage);

		this.subscriptions.push(this.service.ApiCall(formData, `user/updateprofile`, 'POST').subscribe(result => {
			this.presentLoadingWithOptions();
			//this.myForm.resetForm();
			this.profileImage = '';
			// setTimeout(() => {
				this._router.navigate(['tabs/dashboard']);
			//   }, 2000)
			
			// this.common.setProfileData(this.signupForm.value);
			this.userDetails();

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

	userDetails() {
		let param: any = {
			lang_name:2,
			device_os:"and",
			appversion: "1.0.0"
		};    
    // return;
		this.subscriptions.push(this.service.ApiCall(param, `user/detail`, 'POST').subscribe(result => {
      		console.log(result,"result")
  
      
			let userDtl = result.response.data;
			this.common.setProfileData(userDtl);

		}, apiError => {
        console.log('API error');
		}))
	}
}

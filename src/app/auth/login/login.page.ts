import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { CommonService } from '../../shared/services/common.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import {
	ActivatedRoute,
	NavigationCancel,
	NavigationError,
	NavigationStart,
	Router
} from '@angular/router';

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

  languages = [
    {
      id: 1,
      language: 'Portuguese',
      flag: 'assets/images/flag-1.png'
    },
    {
      id: 2,
      language: 'English',
      flag: 'assets/images/flag-2.png'
    }
  ];

  selectedItemId: number;
  loginForm: FormGroup;
  isLanguageModal:boolean = true;

  @ViewChild('myForm') public myForm!: FormGroupDirective;
  otpForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  public loader: any;
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
		private fb: FormBuilder,
    private service: ApiService,
    private common: CommonService,
    private storage: Storage,
    private alertController : AlertController,
    private loadingCtrl: LoadingController
  ) {
    // const isLoggedIn = this.authService.isAuthenticated();
    // // console.log(isLoggedIn);
    // if(isLoggedIn == true){
    //   this.isLanguageModal = false;
    //   this._router.navigate(['/dashboard']);
    // }
    
  }

  ngOnInit() {
    this.createCredentialForm();
    this.createOtpForm();
  }

  createOtpForm(){
    this.otpForm = this.formBuilder.group({
      phone: ['', [Validators.required]]
    });
  }

  get fControl(){
    return this.otpForm.controls;
  }

  submitForm() {
		if (this.otpForm.invalid) {
			return;
		}
		let param: any = {};
		param = this.otpForm.value;
		// param['device_os'] = 'and';
		// param['appversion'] = '1.0.0';

		// console.log(param);
    // return;
    this.showLoading();
		this.subscriptions.push(this.service.ApiCall(param, `user/getphonenumber`, 'POST').subscribe(result => {
      this.dismissLoading();
      this.storage.set(environment.REGISTER_NUMBER, param.phone);
      this.common._onUpdatePhoneSubject.next(param.phone);
      // console.log(result);
			this.myForm.resetForm();
      this._router.navigate(['/otp']);

		}, async apiError => {
        this.dismissLoading();
        let  alert =  await this.alertController.create({
          header: 'Error',
          message: apiError.error.response.status.msg,
          buttons: [{
              text: 'Ok'
            }]
          });
        await alert.present();
		}));
	}

  async showLoading() {
    this.loader = await this.loadingCtrl.create({
		  spinner: "circles",
		  // duration: 5000,
		  message: 'Please wait...',
		  translucent: true,
		  cssClass: 'custom-class custom-loading'
		});
		return await this.loader.present();
  }

  async dismissLoading() {
    this.loader = await this.loadingCtrl.dismiss();
  }

  get formcontrol() {
		return this.loginForm.controls;
	}
 
  selectedLanguange(languageId: number){
    console.log(languageId);
    this.selectedItemId = languageId;
    this.isLanguageModal = false;
  }

  openModal(){
    console.log(this.isLanguageModal,"hello")
    this.isLanguageModal = true;
  }

  createCredentialForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      user_type: 'SA',
      remember: false
    });
  }

  public loginOnSubmit(): boolean | void {
		if (this.loginForm.invalid) {
			return;
		}
    this.authService.login(this.loginForm.value).subscribe(res =>{
      console.log(res);
      if(res.response.status.action_status){
        this._router.navigate(['tabs/dashboard']);
      }
    });
  }
 
  register() {
    this.authService.register(this.loginForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.login(this.loginForm.value).subscribe();
    });
  }
 
}

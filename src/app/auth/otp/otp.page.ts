import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../shared/services/common.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  @ViewChild('myForm') public myForm!: FormGroupDirective;
  otpForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  public phoneNumber : string = '';

  constructor(
    private _router: Router,
		private fb: FormBuilder,
    private service: ApiService,
    private common: CommonService,
    private storage: Storage,
  ) {

  }

  ngOnInit() {
    /* Get phone number */
    this.common.onPhoneUpdateSource$.subscribe((data:any) => {
			this.phoneNumber = data;
		});

    this.storage.get(environment.REGISTER_NUMBER).then(phNumber => {
      if (phNumber) {
        this.phoneNumber = phNumber;
      }
    });

    this.createForm();
  }

  createForm() {
		this.otpForm = this.fb.group({
			otp1: ['', [Validators.required]],
			otp2: ['', [Validators.required]],
			otp3: ['', [Validators.required]],
			otp4: ['', [Validators.required]],
		})
	}

  get formControl() {
		return this.otpForm.controls;
	}

	submitForm() {
    console.log(this.otpForm);
		if (this.otpForm.invalid) {
			return;
		}
		let param: any = {};
		param['phone'] = this.phoneNumber;
		param['otp'] = `${this.otpForm.value.otp1 + this.otpForm.value.otp2 + this.otpForm.value.otp3 + this.otpForm.value.otp4}`;
		param['device_version'] = '29';
		param['device_name'] = 'Google Android SDK built for x86';
		param['device_model'] = 'Android SDK built for x86';
		param['appname'] = 'Merkaaz';
		param['device_token'] = 'fU83xqoESDK4ceNX1dJh_t:APA91bHbnKi54LvJmu576K1lhCUJQM9yiF6TwOD731FsyC9ma4DaV54M_vARBgGTb_o2gA0Y8rDPe0JB5eCQqk1UmInIArStko1AJe9o-9JUMVETBD2AJHw7Q0OKuV3hCgkn_adgOUhs';
		param['appversion'] = '1.0.0';
		param['device_os'] = 'and';
		param['timezone'] = 'Africa/Kigali';

		this.subscriptions.push(this.service.ApiCall(param, `user/verify-otp`, 'POST').subscribe(result => {
      console.log(result);
      this.storage.set(environment.TOKEN_KEY, result.response.data.token);
      this.common.authenticationState.next(true);
			this.myForm.resetForm();
      this._router.navigate(['/dashboard']);
		}, apiError => {
        console.log('API error');
		}))
	}

  otpController(event,next,prev){
    if(event.target.value.length < 1 && prev){
      prev.setFocus()
    }
    else if(next && event.target.value.length>0){
      next.setFocus();
    }
    else {
     return 0;
    } 

  }

}

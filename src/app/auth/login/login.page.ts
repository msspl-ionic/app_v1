import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

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
  credentialsForm: FormGroup;
  isLanguageModal:boolean = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.createCredentialForm();
  }
 
  selectedLanguange(languageId: number){
    this.selectedItemId = languageId;
    this.isLanguageModal = false;
  }

  createCredentialForm(){
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe();
  }
 
  register() {
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.login(this.credentialsForm.value).subscribe();
    });
  }
 
}

import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public toggled: boolean = false;
  private todo : FormGroup;
  emailId: any;
  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController
  ) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%-+]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]],
      phone: ['', Validators.required],
      description: [''],
    });
    this.toggled = false;
  }
  logForm(){
    this.presentLoadingWithOptions()
    console.log(this.todo.value)
    this.todo.reset();
  }
  ngOnInit() {
    this.presentLoadingWithOptions()
  }
// header search jayanta

public toggle(): void {
  this.toggled = !this.toggled;
}

public closeSearch(event: Event) {
  event.preventDefault();
  this.toggled = false;
}

// header search jayanta
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

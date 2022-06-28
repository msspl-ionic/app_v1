import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2PzMpPb4MiHkux7cmlRZlHf_728FBZRg', 
      libraries: ['places']
    })
  ],
  declarations: [SignupPage]
})
export class SignupPageModule {}

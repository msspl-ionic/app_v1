import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetLocationPageRoutingModule } from './set-location-routing.module';

import { SetLocationPage } from './set-location.page';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SetLocationPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2PzMpPb4MiHkux7cmlRZlHf_728FBZRg', 
      libraries: ['places']
    })
  ],
  declarations: [SetLocationPage]
})
export class SetLocationPageModule {}

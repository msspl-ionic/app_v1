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
      apiKey: 'AIzaSyD0wD_ve4ht6PdCyjAYSHx1E_xzZBcn9Ec', 
      libraries: ['places']
    })
  ],
  declarations: [SetLocationPage]
})
export class SetLocationPageModule {}

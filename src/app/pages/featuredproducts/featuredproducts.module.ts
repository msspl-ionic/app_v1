import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturedproductsPageRoutingModule } from './featuredproducts-routing.module';

import { FeaturedproductsPage } from './featuredproducts.page';
import { HeaderModule } from 'src/app/component/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturedproductsPageRoutingModule,
    HeaderModule
  ],
  declarations: [FeaturedproductsPage]
})
export class FeaturedproductsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopByCategoryPageRoutingModule } from './shop-by-category-routing.module';

import { ShopByCategoryPage } from './shop-by-category.page';
import { HeaderModule } from 'src/app/component/header/header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopByCategoryPageRoutingModule,
    HeaderModule
  ],
  declarations: [ShopByCategoryPage]
})
export class ShopByCategoryPageModule {}

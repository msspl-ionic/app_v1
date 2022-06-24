import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedproductsPage } from './featuredproducts.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturedproductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturedproductsPageRoutingModule {}

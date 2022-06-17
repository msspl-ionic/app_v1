import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CongratulationPage } from './congratulation.page';

const routes: Routes = [
  {
    path: '',
    component: CongratulationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CongratulationPageRoutingModule {}

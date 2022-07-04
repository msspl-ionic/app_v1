import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetStartedPage } from './get-started.page';
import { LoginGuardService } from '../../shared/services/login-guard.service';
const routes: Routes = [
  {
    path: '',
    component: GetStartedPage,
    canActivate: [LoginGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetStartedPageRoutingModule {}

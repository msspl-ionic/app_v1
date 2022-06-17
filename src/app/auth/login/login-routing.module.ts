import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from 'src/app/shared/services/login-guard.service';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    // canActivate: [LoginGuardService],
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}

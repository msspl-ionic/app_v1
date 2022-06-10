import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './about.page';
import { AuthGuardService } from '../../shared/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: AboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutPageRoutingModule {}

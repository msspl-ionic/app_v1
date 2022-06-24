import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { GetStartedPage } from '../../auth/get-started/get-started.page';
const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('../../auth/get-started/get-started.module').then( m => m.GetStartedPageModule)
  // },
  // {
  //   path: '',
  //   component: GetStartedPage
  // }
  // {
  //   path: 'login',
  //   loadChildren: () => import('../../auth/login/login.module').then( m => m.LoginPageModule)
  // },
  // {
  //   path: 'otp',
  //   loadChildren: () => import('../../auth/otp/otp.module').then( m => m.OtpPageModule)
  // },
  // {
  //   path: 'signup',
  //   loadChildren: () => import('../../auth/signup/signup.module').then( m => m.SignupPageModule)
  // },
  // {
  //   path: 'set-location',
  //   loadChildren: () => import('../../auth/set-location/set-location.module').then( m => m.SetLocationPageModule)
  // },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'about',
  //   loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
  // },
  // {
  //   path: 'category',
  //   loadChildren: () => import('../category/category.module').then( m => m.CategoryPageModule)
  // },
  // {
  //   path: 'shop-by-category',
  //   loadChildren: () => import('../shop-by-category/shop-by-category.module').then( m => m.ShopByCategoryPageModule)
  // },
  // {
  //   path: 'contact',
  //   loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

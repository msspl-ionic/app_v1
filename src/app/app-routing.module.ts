import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { LoginGuardService } from './shared/services/login-guard.service';
const routes: Routes = [
  // {
  //   path: '',
  //   canActivate: [LoginGuardService],
  //   loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  // },
  {
    path: '',
    canActivate: [LoginGuardService],
    loadChildren: () => import('./auth/get-started/get-started.module').then( m => m.GetStartedPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule),
  },
  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  // },
  // {
  //   path: 'get-started',
  //   canActivate: [LoginGuardService],
  //   loadChildren: () => import('./auth/get-started/get-started.module').then( m => m.GetStartedPageModule)
  // },
  {
		path: '',
		canActivate: [AuthGuardService],
    // component: TabsPage,
		children: [
			{
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
      },
      {
        path: 'shop-by-category',
        loadChildren: () => import('./pages/shop-by-category/shop-by-category.module').then( m => m.ShopByCategoryPageModule)
      },
      {
        path: 'featuredproducts',
        loadChildren: () => import('./pages/featuredproducts/featuredproducts.module').then( m => m.FeaturedproductsPageModule)
      },
      {
        path: 'update-profile',
        loadChildren: () => import('./auth/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
      }
		]
	},
 
  {
    path: 'login',
    canActivate: [LoginGuardService],
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'otp',
    canActivate: [LoginGuardService],
    loadChildren: () => import('./auth/otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'signup',
    canActivate: [LoginGuardService],
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'set-location',
    canActivate: [LoginGuardService],
    loadChildren: () => import('./auth/set-location/set-location.module').then( m => m.SetLocationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('../app/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'user-menu',
    loadChildren: () => import('./pages/user-menu/user-menu.module').then( m => m.UserMenuPageModule)
  },
  {
    path: 'congratulation',
    loadChildren: () => import('./auth/congratulation/congratulation.module').then( m => m.CongratulationPageModule)
  },
  // {
  //   path: 'featuredproducts',
  //   loadChildren: () => import('./pages/featuredproducts/featuredproducts.module').then( m => m.FeaturedproductsPageModule)
  // },
  // {
  //   path: 'update-profile',
  //   loadChildren: () => import('./auth/update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

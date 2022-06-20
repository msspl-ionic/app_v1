import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MenuPage} from './pages/menu/menu.page'
import { TabsPage } from './pages/tabs/tabs.page';
import { Network } from '@ionic-native/network/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { IonicStorageModule } from '@ionic/storage-angular';

//Interceptor import
import { HTTPInterceptorProvider } from '../app/shared/interceptors';

@NgModule({
  declarations: [AppComponent,MenuPage,TabsPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, JwtModule.forRoot({ // for JwtHelperService
    config: {
      tokenGetter: () => {
        return '';
      }
    }
  }),
  IonicStorageModule.forRoot(),
  ],
  providers: [HTTPInterceptorProvider, JwtHelperService,HttpClientModule, Network, Device, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

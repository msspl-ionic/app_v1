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
@NgModule({
  declarations: [AppComponent,MenuPage,TabsPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [Network, Device, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

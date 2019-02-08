import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { FirstPage } from '../pages/app/firstpage';
import {ReportPage} from "../pages/report/report";
import {ReportlistPage} from "../pages/reportlist/reportlist";
import {ReportShowPage} from "../pages/reportshow/reportshow"

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Pro } from '@ionic/pro';
import { Injectable, Injector } from '@angular/core';

import { Camera } from '@ionic-native/camera';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {Geolocation} from "@ionic-native/geolocation";
import { IonicStorageModule } from '@ionic/storage';
import { MediaCapture} from "@ionic-native/media-capture";
import { File } from '@ionic-native/file';
import { NativeAudio} from "@ionic-native/native-audio";
import { Toast } from "@ionic-native/toast";
import { Media} from "@ionic-native/media";

Pro.init('YOUR_APP_ID', {
  appVersion: 'APP_VERSION'
})


@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FirstPage,
    ReportPage,
    ReportlistPage,
    ReportShowPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FirstPage,
    ReportPage,
    ReportlistPage,
    ReportShowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	IonicErrorHandler,
    Camera,
    AndroidPermissions ,
    Geolocation,
    MediaCapture,
    File,
    NativeAudio,
    Toast,
    Media,
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ]
})
export class AppModule {}

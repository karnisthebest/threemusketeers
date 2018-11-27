import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {ChartsModule} from 'ng2-charts';// import charts
import { BarPage } from '../pages/bar/bar';
import { DoughnutPage } from '../pages/doughnut/doughnut';
import { LinePage } from '../pages/line/line';
import { PiePage } from '../pages/pie/pie';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { HttpModule } from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { IonicStorageModule } from '@ionic/storage';
import { RegisterPageModule } from '../pages/register/register.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ChartServiceProvider } from '../providers/chart-service/chart-service';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { SettingPageModule } from '../pages/setting/setting.module';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HelperServiceProvider } from '../providers/helper-service/helper-service';
import { DateServiceProvider } from '../providers/date-service/date-service';
//import { OrderPage } from '../pages/order';


@NgModule({
  declarations: [
    MyApp,
    //TabsPage
    
    //OrderPage
    //LoginPage,
    //RegisterPage,
    
    //AboutPage,
    //ContactPage,
    //HomePage,
    
    //BarPage,
    //DoughnutPage,
    //LinePage,
    //PiePage
    
  ],
  imports: [
    IonicPageModule.forChild(MyApp),//lazy looding
    BrowserModule,
    HttpClientModule,

    IonicModule.forRoot(MyApp),
    ChartsModule, // import charts
    HttpModule,
    IonicStorageModule.forRoot(),
    
    //Camera,
    
    
    //RegisterPageModule,
    //LoginPageModule
    //SettingPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   // TabsPage//,
    //LoginPage,
    //RegisterPage,
    //AboutPage,
    //ContactPage,
    //HomePage,
    
    //BarPage,
    //DoughnutPage,
    //LinePage,
    //PiePage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ChartServiceProvider,
    DataServiceProvider,
    BarcodeScanner,
    HelperServiceProvider,
    DateServiceProvider
    
  ]
})
export class AppModule {}

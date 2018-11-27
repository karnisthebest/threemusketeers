import { Component } from '@angular/core';
import { App } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  isLoggedIn = false;

  tab1Root = "HomePage";
  tab2Root = "ManagementPage";
  //tab3Root = "ProfilePage";
  tab4Root = "SettingPage";
  tab5Root = "PredictionPage";
  tab6Root = "FilterPage";
  constructor(public appCtrl: App) {
    
  }
  logout() {
    this.appCtrl.getRootNav().setRoot("LoginPage");
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  Menus:any = [ {label:"Setting", subs:[{title:"About", goto:"AboutPage", icon:"information-circle"},
                                      {title:"Contact", goto:"ContactPage", icon:"contacts"},
                                    ]},

                {label:"Account", subs:[{title:"Profile", goto:"ProfilePage", icon:"list"},
                                      {title:"Pie", goto:"PiePage", icon:"pie"},
                                    ]},

              ];
              
  sub1:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private AuthServiceProvider:AuthServiceProvider) {
  }

  opendetail(page,p){
    this.navCtrl.push(page,p);
  }







  ToPage(Page){
    this.navCtrl.push(Page);


  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    if(this.AuthServiceProvider.CheckLogin()){

    }
  }

}

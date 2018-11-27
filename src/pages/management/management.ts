import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
/**
 * Generated class for the ManagementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-management',
  templateUrl: 'management.html',
})
export class ManagementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private AuthServiceProvider: AuthServiceProvider) {
  }
  

  Menus: any = [{
    label: "Order", subs: [{ title: "Create", goto: "OrderOrderPage", icon: "information-circle" },
    { title: "View", goto: "ViewOrderPage", icon: "contacts" },
    ]
  },

  {
    label: "Merchandise", subs: [{ title: "View", goto: "MerchandiseViewPage", icon: "list" },
    { title: "Report", goto: "PiePage", icon: "pie" },
    ]
  },

  {
    label: "Customers", subs: [{ title: "View", goto: "CustomerViewPage", icon: "list" },
    { title: "Report", goto: "PiePage", icon: "pie" },
    ]
  },

  ];

  sub1: boolean = false;

  opendetail(page, p) {
    this.navCtrl.push(page, p);
  }



  ToPage(Page) {
    this.navCtrl.push(Page);


  }

  ionViewDidLoad() {
    if(this.AuthServiceProvider.CheckLogin()){

    }
  }
}

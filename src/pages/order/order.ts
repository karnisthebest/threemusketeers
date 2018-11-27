import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { stringify } from '@angular/compiler/src/util';
/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private DataServiceProvider: DataServiceProvider,
    private AuthServiceProvider: AuthServiceProvider) {
  }

  Menus: any = [{
    label: "Order Management", subs: [{ title: "Order", goto: "OrderOrderPage", icon: "information-circle" },
    { title: "View", goto: "ViewOrderPage", icon: "contacts" },
    ]
  },

  {
    label: "Account", subs: [{ title: "Line", goto: "LinePage", icon: "list" },
    { title: "Pie", goto: "PiePage", icon: "pie" },
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

  }
}

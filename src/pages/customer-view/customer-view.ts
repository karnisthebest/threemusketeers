import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelperServiceProvider} from '../../providers/helper-service/helper-service';
/**
 * Generated class for the CustomerViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-view',
  templateUrl: 'customer-view.html',
})
export class CustomerViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private HelperServiceProvider:HelperServiceProvider) {
  }

  getCustomerInfo(){
    let foo = this.HelperServiceProvider.GetData({}).subcribe(value => {
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerViewPage');
  }

}

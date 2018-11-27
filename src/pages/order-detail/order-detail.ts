import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import parse from 'date-fns/parse';
/**
 * Generated class for the OrderDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  order = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams,private AuthServiceProvider:AuthServiceProvider) {
  }
  readableTimes(times:any){
    return parse(times);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
    if(this.AuthServiceProvider.CheckLogin()){

    }
  }

}

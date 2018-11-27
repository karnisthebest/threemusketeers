import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  public SubmitOrder2(){
    this.navCtrl.push("PaymentPage");
  }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmationPage');
  }

}

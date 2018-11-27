import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ButtonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buttons',
  templateUrl: 'buttons.html',
})
export class ButtonsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ButtonsPage');
  }

  goOrderOrder(){
    this.navCtrl.push("OrderOrderPage");
  }

  goAbout(){
    this.navCtrl.push("AboutPage");

  }

  goBar(){
    this.navCtrl.push("BarPage");

  }
  
  goContact(){

    this.navCtrl.push("ContactPage");
  }

  goCustomer(){
    this.navCtrl.push("CustomerPage");

  }

  goCustomerView(){
    this.navCtrl.push("CustomerViewPage");

  }

  godoughnut(){
    this.navCtrl.push("DoughnutPage");

  }

  goFilter(){
    this.navCtrl.push("FilterPage");

  }

  goHome(){
    this.navCtrl.push("HomePage");

  }

  goImport(){
    this.navCtrl.push("ImportPage");

  }

  goLine(){
    this.navCtrl.push("LinePage");

  }

  goLogin(){
    this.navCtrl.push("LoginPage");

  }

  goManagement(){
    this.navCtrl.push("ManagementPage");

  }

  goMerchandiseDetail(){
    this.navCtrl.push("MerchandiseDetailPage");

  }

  goMerchandiseView(){
    this.navCtrl.push("MerchandiseViewPage");

  }

  goOrder(){
    this.navCtrl.push("OrderPage");

  }

  goOrderConfirmation(){
    this.navCtrl.push("OrderConfirmationPage");

  }

  goOrderDetail(){
    this.navCtrl.push("OrderDetailPage");

  }

  goPayment(){
    this.navCtrl.push("PaymentPage");

  }

  goPie(){
    this.navCtrl.push("PiePage");

  }

  goPrediction(){
    this.navCtrl.push("PredictionPage");

  }

  goProfile(){
    this.navCtrl.push("ProfilePage");

  }

  goRegister(){
    this.navCtrl.push("RegisterPage");

  }

  gosetting(){
    this.navCtrl.push("SettingPage");

  }

  gotabs(){
    this.navCtrl.push("TabsPage");

  }

  goViewOrder(){
    this.navCtrl.push("ViewOrderPage");

  }


  
}

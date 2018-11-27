import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelperServiceProvider} from '../../providers/helper-service/helper-service';

/**
 * Generated class for the CustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private HelperServiceProvider:HelperServiceProvider) {
    
  }

  GetCustomerInfo(){
    this.HelperServiceProvider.PostData({})

  }

  varfilterall: any;
  shouldShowCancel: any;
  FilterPage: any;
  filtered: any;
  order: any;
    
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    //this.GetMerChandise();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 4000);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }

  filterall(){

  }

  onCancel($event){

  }

  ViewDetail(x,y){

  }

  slideclose(){

  }
}

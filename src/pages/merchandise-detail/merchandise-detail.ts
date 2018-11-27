import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider} from '../../providers/data-service/data-service';
/**
 * Generated class for the MerchandiseDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-merchandise-detail',
  templateUrl: 'merchandise-detail.html',
})
export class MerchandiseDetailPage {
  merchandise = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.merchandise);
  }

}

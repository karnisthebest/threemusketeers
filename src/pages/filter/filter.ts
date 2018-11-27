import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider} from '../../providers/data-service/data-service';
/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {

  filter:any={filter:{type1:false,type2:false,type3:false},order:"",date:""};

  varfilterall:any = {order:'',filter:'',range:'',orderIsCanceled:null};
  constructor(public navCtrl: NavController, public navParams: NavParams, private DataServiceProvider:DataServiceProvider) {
  }

  
  click(command){
    if(command == true){
      this.DataServiceProvider.varfilterall.order = this.varfilterall.order;
      this.DataServiceProvider.varfilterall.range = this.varfilterall.range;
      this.DataServiceProvider.varfilterall.orderIsCanceled = this.varfilterall.orderIsCanceled;
      this.navCtrl.push("MerchandiseViewPage");
      
    }
    else{
      this.navCtrl.push("MerchandiseViewPage");
    }
  }


  public getFilter(){
    return this.filter;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

}

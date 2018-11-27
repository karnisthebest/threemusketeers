import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {DataServiceProvider} from '../../providers/data-service/data-service';
import { Observable } from 'rxjs/Observable';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

/**
 * Generated class for the MerchandiseViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-merchandise-view',
  templateUrl: 'merchandise-view.html',
})
export class MerchandiseViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private DataServiceProvider:DataServiceProvider, 
    private AuthServiceProvider :AuthServiceProvider,
    private loadingCtrl: LoadingController) {
    this.varfilterall = {order:'Ascending',filter:'',range:'',shelfref:''};
  }
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.GetMerChandise();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 4000);
  }

/////////////////////////
  // start CodeBox
  MerchandiseList:any;
  public GetMerChandise(IsloadingShow=false) {
    let _Subscribe: any //declaration variable to unsubscribe if any error is occurred
    let _access: any= {access:false,data:[]}; // value that return to use in another function to determine whether date is complete or not
    let url = "http://localhost:44300/api/Merchandise/Search";// Url for get/post 
    let token = this.AuthServiceProvider.token;// use to authenticate
    let body = { "IdentityId": "true" }; //the information which send to server
    if (body.IdentityId === null) { //Check data is valid or not
      return Observable.throw("Please insert body"); //throw "Please insert body"
    }
    else {
      if(IsloadingShow == true){
        this.presentLoadingCustom();
      }
      
      return Observable.create(observer => {
        _Subscribe = this.DataServiceProvider.PostData(url, body,token) //Call function PostData from data-service
          .subscribe(
            data => { //use the data to do something if data is not null
              if (data) {
                
                this.MerchandiseList = data.data;
                //this.filtered = this.MerchandiseList;
                //console.log("Got Data",this.filtered);
                _access.access = true;
                this.filterall();
                observer.next(_access);
                observer.complete();
              }
              else { //use the data to do something if data is null
                console.log("Not get Data ",data)
                _access.access = false;
                observer.error(new Error('CreateCodeBox Error!'));
                observer.complete();
              }
            },
            err => { console.log('Error handle', err);
                    _access.access = false;
                    _access.data = err;
                    },//can add function to handle the action of error
            () => { console.log('CreateCodeBox Done'); } // when get data is completed. It will console.log('GetMerchandise Done')
          );
        setTimeout(() => observer.next(_access), 4000); //if there is no error, return _access
        setTimeout(() => observer.complete(), 4000); // notifies the Observer that the Observable has finished if there is no error.
        setTimeout(() => observer.error(new Error('CreateCodeBox Error!')), 4000); //throw Error
      }, err => console.error('observer : ', err))
      .subscribe(value=> {
        if(value.access){ 
          
          if(IsloadingShow == true){
            this.loadingView.dismiss();
          }
          console.log("Do Something wuth data passed",value)
          
        }
        else{
          console.log("4 ",value)
          _Subscribe.unsubscribe();
        }
      },error => {console.error(error.message)},
      () => {console.log('Completed subscribe')}
      )
    }
  }
  // end CodeBox
  //////////////////////////////
 
    //Search
    filtered:any =[];
    varfilterall:any = {order:'',filter:'',range:'',shelfref:''};
    public filterall(){
      console.log("run","filterall()")
      this.filtered = this.MerchandiseList;
      let start;
      let end;
      let now = new Date();
      switch (this.varfilterall.range) {
        case 'today':
            start = new Date(now.setHours(0, 0, 0, 0));
            end = new Date(now.setHours(23, 59, 59, 999));
            break;
        case 'week':
            start = new Date(now.setHours(0, 0, 0, 0));
            end = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate() + (7 - now.getDay()), 23, 59, 59, 999
            );
            break;
        case 'all':
            start = new Date(
              now.getFullYear()-(1000),
              now.getMonth(),
              now.getDate() + (7 - now.getDay()), 23, 59, 59, 999
            );
            end = new Date(
              now.getFullYear()+(1000),
              now.getMonth(),
              now.getDate() + (7 - now.getDay()), 23, 59, 59, 999
            );
            break;
        default:
            start = new Date(now.setHours(0, 0, 0, 0));
            end = new Date(now.setHours(23, 59, 59, 999));
            break;
            // range = this.filters.customRange;
            // start = range[0];
            // end = range[1];
        }
      
      if(this.varfilterall.filter != ''){
        this.filtered = this.filtered.filter(o => o.merchandiseName.includes(this.varfilterall.filter));
        console.log("1");
      }
      if(this.varfilterall.range != ''){
        this.filtered = this.filtered.filter(o =>  Date.parse(o.orderTimes) >= start && Date.parse(o.orderTimes) <= end);
        console.log("date filter");
      }
      if(this.varfilterall.orderIsCanceled == 'true'){
        this.filtered = this.filtered.filter(o => o.orderIsCanceled == true);
        console.log("date orderIsCanceled");
      }
      
      
      if(this.varfilterall.order =='Ascending'){
        this.filtered.sort((n1,n2) => n1.merchandiseQTY - n2.merchandiseQTY)
        console.log("2");
      }
      else if(this.varfilterall.order == 'Descending'){
        this.filtered.sort((n1,n2) => n1.merchandiseQTY - n2.merchandiseQTY).reverse();
        console.log("3");
      }
      console.log("varfilterall", this.filtered );
      
      
    }
  //end Search
  ttttttttt = this.navParams.data;
  ViewDetail(page:string,object:any[]){
    this.navCtrl.push(page,object);
  }

  loadingView:any;
  presentLoadingCustom() {
    this.loadingView = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"><object data='../../assets/icon/loading.svg' type='image/svg+xml'></object></div>
        </div>`,
      duration: 15000
    });
  
    this.loadingView.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    this.loadingView.present();
  }
  ionViewWillEnter() {
    console.log("im backkk")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MerchandiseViewPage');
    if (this.AuthServiceProvider.CheckLogin()){
      this.GetMerChandise(true);
    }
  }

}

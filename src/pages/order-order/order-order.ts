import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the OrderOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-order',
  templateUrl: 'order-order.html',
})
export class OrderOrderPage {
  bodyjson: any = {
    ReceiverName: 'Matong',
    ReceiverAddress: 'ReceiverAddress',
    ReceiverCity: 'ReceiverCity',
    ReceiverCountry: 'ReceiverCountry',
    ReceiverZipCode: '10100',
    OrderReMark: 'OrderReMark',
    DeliveryTimes: '',
    DistributorRef: '1',
    CouponRef: 'cou50',
    OrderMerchandiseList: ''
  };
  OrderMerchandiseList: any;
  itemsOrder: any = [];
  OrderSuccess: boolean = false;
  itemsOrderCheckQTY: any = [];
  itemselected: any;

  MerchandiseList: any = [];
  datamockup: any = [];
  DataResponse: any = {};


  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private DataServiceProvider: DataServiceProvider,
    private AuthServiceProvider: AuthServiceProvider,
    private loadingCtrl: LoadingController) {
  }



  public selectObjectById(list: any[], id: string, property: string) {
    var item = list.find(item => item.merchandiseId === id);
    //var prop = eval('this.' + property);
    //prop = property;
    console.log(item);
  }






  //
  /////////////////////////
  // start GetMerchandise
  public GetMerchandise() {
    let MerchandiseSubscribe: any
    let _access: any= {access:false,data:[]};
    let url = "http://localhost:44300/api/Merchandise/Search";
    let token = this.AuthServiceProvider.token;
    let body = { "IdentityId": "true" };
    if (body.IdentityId === null) {
      return Observable.throw("Please insert body");
    }
    else {
      return Observable.create(observer => {
        MerchandiseSubscribe = this.DataServiceProvider.PostData(url, body,token)
          .subscribe(
            data => {
              if (data) {
                
                this.MerchandiseList = data.data; //assgin data to html
                _access.access = true;
                observer.next(_access);
                observer.complete();
                console.log("1 ",this.MerchandiseList);
                
              }
              else {
                console.log("2 ",data)
                _access.access = false;
                observer.error(new Error('Merchandise Error!'));
                observer.complete();
              }
            },
            err => { console.log('Error handle', err);
                    _access.access = false;
                    _access.data = err; },//can add function to handle the action of error
            () => { console.log('GetMerchandise Done'); }
          );
        setTimeout(() => observer.next(_access), 4000);
        //setTimeout(() => observer.complete(), 4000);
        setTimeout(() => observer.error(new Error('Merchandise Error!')), 4000);
      }, err => console.error('observer : ', err))
      .subscribe(value=> {
        if(value.access){
          console.log("3 ",value)
        }
        else{
          console.log("4 ",value)
          MerchandiseSubscribe.unsubscribe();
        }
      },error => {console.error(error.message)},
      () => {console.log('Completed subscribe')}
      )
    }
  }
  // end GetMerchandise
  //////////////////////////////


  /////////////////////////
  // start CreateOrder
  public CreateOrder(IsloadingShow=false) {
    let CreateOrderSubscribe: any
    let _access: any= {access:false,data:[]};
    let url = "http://localhost:44300/api/Orders/Create";
    let token = this.AuthServiceProvider.token;
    let body = this.bodyjson;
    if (body.IdentityId === null) {
      return Observable.throw("Please insert body");
    }
    else {
      if(IsloadingShow == true){
        this.presentLoadingCustom();
      }
      return Observable.create(observer => {
        CreateOrderSubscribe = this.DataServiceProvider.PostData(url, body,token)
          .subscribe(
            data => {
              if (data) {
                console.log("1 ",data);
                this.DataResponse = data;
                _access.access = true;
                observer.next(_access);
                observer.complete();
              }
              else {
                console.log("2 ",data)
                _access.access = false;
                observer.error(new Error('CreateOrder Error!'));
                observer.complete();
              }
            },
            err => { console.log('Error handle', err);
                    _access.access = false;
                    _access.data = err; },//can add function to handle the action of error },//can add function to handle the action of error
            () => { console.log('CreateOrder Done'); }
          );
        setTimeout(() => observer.next(_access), 4000);
        setTimeout(() => observer.complete(), 4000);
        setTimeout(() => observer.error(new Error('CreateOrder Error!')), 4000);
      }, err => console.error('observer : ', err))
      .subscribe(value=> {
        if(value.access){
          console.log("3 ",value)
          this.bodyjson = {
            ReceiverName: '',
            ReceiverAddress: '',
            ReceiverCity: '',
            ReceiverCountry: '',
            ReceiverZipCode: '',
            OrderReMark: '',
            DeliveryTimes: '',
            DistributorRef: '1',
            CouponRef: 'cou50',
            OrderMerchandiseList: ''
          };
          this.itemsOrder = [];
          this.itemsOrderCheckQTY = [];
          this.itemselected = [];
          if(IsloadingShow == true){
            this.loadingView.dismiss();
          }
        }
        else{
          console.log("4 ",value)
          this.popupOrderCreatedError();
          CreateOrderSubscribe.unsubscribe();
        }
      },error => {console.error(error.message)},
      () => {console.log('Completed subscribe')}
      )
    }
  }
  
  // loading 
  popupOrderCreated() {
    let alert = this.alertCtrl.create({
      title: "OrderCreated",
      subTitle: "Done",
      buttons: [
        {
          text: 'OK',
          handler: data => {
          }
        }
      ]
    });
    alert.present();
    this.loading.dismiss();
  }
  popupOrderCreatedError() {
    let alert = this.alertCtrl.create({
      title: "OrderCreated",
      subTitle: "Error",
      buttons: [
        {
          text: 'OK',
          handler: data => {
          }
        }
      ]
    });
    alert.present();
    this.loading.dismiss();
  }
  loading: Loading;
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  // end CreateOrder
  //////////////////////////////

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


  ///Distinct
  public distinct(data){
    let raw = data;
    let filtered_data = raw.map(item => item.week).filter((value,index, self) => self.indexOf(value) === index);
    return filtered_data;
  }
  ///End Distinc



  public FindItemsSelected(itemSelected: any) {
    this.itemsOrder = [];
    this.itemsOrderCheckQTY = [];
    for (const key in itemSelected) {
      if (itemSelected.hasOwnProperty(key)) {
        const element = itemSelected[key];

        this.itemsOrder.push(new Object({
          merchandiseId: element.merchandiseId,
          merchandiseName: element.merchandiseName,
          merchandiseQTY: element.merchandiseQTY
        }));
        this.itemsOrderCheckQTY.push(new Object({
          merchandiseId: element.merchandiseId,
          merchandiseQTY: element.merchandiseQTY
        }));
      }
    }
    console.log(this.itemsOrder);
  }

  public SubmitOrder2(){
    this.navCtrl.push("OrderConfirmationPage");
  }

  public SubmitOrder() {
    this.OrderMerchandiseList = [];
    this.OrderSuccess = false;
    let error: any = "";
    let errorsub: any = "";
    for (const key in this.itemsOrder) {
      if (this.itemsOrder.hasOwnProperty(key)) {
        const element = this.itemsOrder[key];
        if (element.merchandiseQTY > this.itemsOrderCheckQTY[key].merchandiseQTY) {
          console.log("item more that limit", element.merchandiseId);
          this.OrderSuccess = false;
          error += "Some item is more than limit";
          errorsub += element.merchandiseId;
          this.showPopup(error, errorsub)
          break;
        }
        else {
          this.OrderSuccess = true;
        }
      }
    }//need to move to data service
    if (this.OrderSuccess) {
      var str = JSON.stringify(this.itemsOrder);//json body
      this.bodyjson.OrderMerchandiseList = str;
      //console.log("dd ", this.bodyjson);
      this.CreateOrder();
    }


  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.OrderSuccess) {
              //this.navCtrl.popToRoot();
              //Add clear form later
              this.itemsOrder = [];

              this.itemsOrderCheckQTY = [];
              this.itemselected = [];
            }
          }
        }
      ]
    });
    alert.present();
  }



  ionViewDidLoad() {
    if(true){
      this.GetMerchandise();
    }
    
  }
}

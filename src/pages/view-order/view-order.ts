import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, LoadingController, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Observable } from 'rxjs/Observable';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import parse from 'date-fns/parse';

/**
 * Generated class for the ViewOrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-order',
  templateUrl: 'view-order.html',
})
export class ViewOrderPage {
  products:any = [
    {id:"01",name:"pro01",qty:1,detail:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
    {id:"02",name:"pro02",qty:2,detail:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
    {id:"03",name:"pro03",qty:3,detail:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"},
    {id:"04",name:"pro04",qty:4,detail:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"}
  ];
  Orders:any =[];// HTTP GET
  
    constructor(public navCtrl: NavController, 
      public navParams: NavParams, 
      private DataServiceProvider :DataServiceProvider,
      private AuthServiceProvider:AuthServiceProvider,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController) {
        this.varfilterall.range = 'all';
        this.varfilterall.order = 'Ascending';
        this.varfilterall.orderIsCanceled = 'false';
    }
    readableTimes(times:any){
      return parse(times);
    }
  /////////////////////////
    // start CodeBox
    public GetOrderData(IsloadingShow = false) {
      let _Subscribe: any //declaration variable to unsubscribe if any error is occurred
      let _access: any= {access:false,data:[]}; // value that return to use in another function to determine whether date is complete or not
      let url = "http://localhost:44300/api/Orders/Search";// Url for get/post 
      let token = this.AuthServiceProvider.token;// use to authenticate
      let body = { "IdentityId": "true" }; //the information which send to server
      //let body = null; //the information which send to server
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
                  //data assign
                  console.log("1 ",data);
                  this.Orders = data.data;
                  this.filtered = data.data;
                  this.filterall();
                  
                  //console.log("ddddddereb", this.filtered )
                  
                  _access.access = true;

                  observer.next(_access);
                  observer.complete();
                }
                else { //use the data to do something if data is null
                  console.log("2 ",data)
                  _access.access = false;
                  observer.error(new Error('Merchandise Error!'));
                  observer.complete();
                }
              },
              err => { console.log('Error handle', err);
                    _access.access = false;
                    _access.data = err; },//can add function to handle the action of error
              () => { console.log('GetMerchandise Done'); } // when get data is completed. It will console.log('GetMerchandise Done')
            );
          setTimeout(() => observer.next(_access), 4000); //if there is no error, return _access after 4 sec.
          setTimeout(() => observer.complete(), 4000); // notifies the Observer that the Observable has finished if there is no error.
          setTimeout(() => observer.error(new Error('Merchandise Error!')), 4000); //throw Error
        }, err => console.error('observer : ', err))
        .subscribe(value=> {
          if(value.access){
            console.log("3 ",value)

            if(IsloadingShow == true){
              this.loadingView.dismiss();
            }
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
  
    //simple code
    public sort(list:any[]):any[]{
      return list.sort((n1,n2) => n1 - n2)
    }

    public filter(list:any[],filter:any):any[]{
      return list.filter(list => list == filter);
    }
  //end simple code
  //product handle
    ViewDetail(page:string,object:any[]){
      this.navCtrl.push(page,object);
    }
  
    DeleteItem2 (object:any[],id:any){
      //var index = object.indexOf(id);
      object.splice(id,1);
    }
    DeleteItem (object:string){

      var Ordersindex = this.Orders.indexOf(object);
      var filteredindex = this.filtered.indexOf(object);
      console.log(filteredindex)
      console.log(Ordersindex)
      if(filteredindex != -1){
        this.filtered.splice(filteredindex,1);
      }
      if(Ordersindex != -1){
        this.Orders.splice(Ordersindex,1);
      }
      
    }
  //end product handle
  
  //slide inlist func
    slideclose(slidingItem: ItemSliding) {
      slidingItem.close();
    }
  //end slide inlist func
  //RandomColor
    getRandomColor() {
      var color = Math.floor(0x1000000 * Math.random()).toString(16);
      return '#' + ('000000' + color).slice(-6);
    }
  //end RandomColor
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.GetOrderData();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 4000);
  }

  showfilterbox:any=true;

  delete(chip: Element) {
    chip.remove();
  }




    Chips:any={chip0:false,chip1:false,chip2:false,chip3:false};
  ChipClick(chip){
    this.Chips[chip] = true;
    console.log(this.Chips);
  }




















  //Search
    filtered:any =[];
    varfilterall:any = {order:'',filter:'',range:'',orderIsCanceled:null};
    public filterall(){
      console.log("run","filterall()")
      this.filtered = this.Orders;
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
        this.filtered = this.filtered.filter(o => o.orderId.includes(this.varfilterall.filter));
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
        this.filtered.sort((n1,n2) => Date.parse(n1.orderTimes) - Date.parse(n2.orderTimes))
        console.log("2");
      }
      else if(this.varfilterall.order == 'Descending'){
        this.filtered.sort((n1,n2) =>  Date.parse(n1.orderTimes) - Date.parse(n2.orderTimes)).reverse();
        console.log("3");
      }
      console.log("varfilterall", this.filtered );
      
      
    }
  //end Search
  
  
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

  
    
  
  
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad ProductPage');
      if(this.AuthServiceProvider.CheckLogin()){
        this.GetOrderData(true);
        //this.filterall();
      }
      
    }

}

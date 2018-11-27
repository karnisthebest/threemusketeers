import { Component, ViewChild } from '@angular/core';
import { NavController, App, IonicPage, LoadingController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { Chart } from 'Chart.js';
import { HttpHeaders } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import{HelperServiceProvider} from '../../providers/helper-service/helper-service'
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Order_Data: any;
  Order_Data_distinct: any;

  merchandiseData: any = {};// crucial to assign {}
  dashboardData: any = {};
  constructor(public navCtrl: NavController,
    private AuthServiceProvider: AuthServiceProvider,
    public http: Http,
    public storage: Storage,
    public DataServiceProvider: DataServiceProvider,
    public appCtrl: App,
    public BarcodeScanner: BarcodeScanner,
    private loadingCtrl: LoadingController,
    private HelperServiceProvider:HelperServiceProvider
  ) {
    //this.GetOrders();

  }


  


calltest(){
  console.log("run === this.HelperServiceProvider.PostData({});");
  this.presentLoadingCustom();
  let run = this.HelperServiceProvider.PostData({}).subscribe(value => {
    if (value.access) {
      console.log("Send value01", value);
      this.loadingView.dismiss();
      //return value;
    }
    else {
      console.log("Send value01 else", value);
      console.log("error", this.HelperServiceProvider.HTTP_errorhandle(value.error))
      this.loadingView.dismiss();
      //return value;
    }
  }, error => { console.error(error.message) },
    () => { console.log('Completed subscribe007') }
  )
  
}

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.GetOrders();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 4000);
  }
  /////////////////////////
  // start CodeBox
  public GetOrders(IsloadingShow = false) {
    let _Subscribe: any //declaration variable to unsubscribe if any error is occurred
    let _access: any = { access: false, data: [] }; // value that return to use in another function to determine whether date is complete or not
    let url = "http://localhost:44300/api/Orders/Search";// Url for get/post 
    let token = this.AuthServiceProvider.token;// use to authenticate
    let body = { IdentityId: "true" }; //the information which send to server
    if (body.IdentityId === null) { //Check data is valid or not
      return Observable.throw("Please insert body"); //throw "Please insert body"
    }
    else {
      if(IsloadingShow == true){
        this.presentLoadingCustom();
      }

      return Observable.create(observer => {
        _Subscribe = this.DataServiceProvider.PostData(url, body, token) //Call function PostData from data-service
          .subscribe(
            data => { //use the data to do something if data is not null
              if (data) {
                console.log("1 ", data);

                this.Order_Data = data.data;
                //let dist = this.distinct_V2(data);
                //this.ChartRemoveValue();
                //dist.forEach(element => {
                //  this.doughnutChartEl_AddData(element.qty/element.count,element.week);
                //});


                this.Order_Data_distinct = this.distinct_utc(data.data);
                console.log("distinct_utc", this.Order_Data_distinct);
                this.reportData = this.Order_Data_distinct;
                _access.access = true;
                console.log("distinct_utc", "this.Order_Data_distinct)");
                this.reportfilterall();
                observer.next(_access);
                observer.complete();
              }
              else { //use the data to do something if data is null
                console.log("2 ", data)
                _access.access = false;
                observer.error(new Error('CreateCodeBox Error!'));
              }
            },
            err => {
              console.log('Error handle', err);
              _access.access = false;
              _access.data = err;
            },//can add function to handle the action of error
            () => { console.log('CreateCodeBox Done'); } // when get data is completed. It will console.log('GetMerchandise Done')
          );
        //setTimeout(() => observer.next(_access), 4000); //if there is no error, return _access
        //setTimeout(() => observer.complete(), 4000); // notifies the Observer that the Observable has finished if there is no error.
        //setTimeout(() => observer.error(new Error('CreateCodeBox Error!')), 4000); //throw Error
      }, err => console.error('observer : ', err))
        .subscribe(value => {
          if (value.access) {
            console.log("3 ", value)
            if(IsloadingShow == true){
              this.loadingView.dismiss();
            }

          }
          else {
            console.log("4 ", value)
            _Subscribe.unsubscribe();
          }
        }, error => { console.error(error.message) },
          () => { console.log('Completed subscribe') }
        )
    }
  }
  // end CodeBox
  //////////////////////////////



  doughnutChartEl_AddData(List_Value: any, List_Label: any) {
    this.doughnutchartValues.push(List_Value);
    this.doughnutchartLabels.push(List_Label);
    this.doughnutchartColours.push(this.getRandomColor());
    this.doughnutchartHoverColours.push(this.getRandomColor());
    this.doughnutChartEl.update();
  }
  ChartRemoveValue() {
    let count = this.doughnutchartValues.length;
    for (let index = 0; index < count; index++) {
      console.log("ChartRemoveValue")
      this.doughnutchartValues.shift();
      this.doughnutchartLabels.shift();
      this.doughnutchartColours.shift();
      this.doughnutchartHoverColours.shift();
    }
    this.doughnutChartEl.update();
  }


  //Search
  reportData: any = [];
  report: any = { range: 'all' };
  public reportfilterall() {
    console.log("run", "filterall()")
    this.reportData = this.Order_Data_distinct;
    let start;
    let end;
    let now = new Date();
    switch (this.report.range) {
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
          now.getFullYear() - (1000),
          now.getMonth(),
          now.getDate() + (now.getDay()), 23, 59, 59, 999
        );
        end = new Date(
          now.getFullYear() + (1000),
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

    console.log("varfilterall01", this.reportData);
    if (this.report.range != '') {
      this.reportData = this.reportData.filter(o => Date.parse(o.deliveryTimes) >= start && Date.parse(o.deliveryTimes) <= end);
      console.log("date filter");
    }
    console.log("varfilterall", this.reportData);

    this.ChartRemoveValue();
    if(this.reportData.length == 0){
      this.doughnutChartEl_AddData(0, "No Order");
    }
    this.reportData.forEach(element => {
      let date = new Date(element.deliveryTimes);
      let day = date.getDay()+1;
      let month = date.getMonth()+1;
      let year = date.getFullYear();
      let DayText = day+"/"+month+"/"+year;
      this.doughnutChartEl_AddData(element.count, DayText);
    });
  }
  //end Search



  public ScanerQR() {
    this.BarcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  /////distinct
  public distinct_utc(_ListOfObject) { // utc time distinct
    let _sum = [];
    var mapfoo = _ListOfObject.map(ListOfObject => {
      let index = _sum.findIndex(sum => {
        let sum_time = new Date(sum.deliveryTimes);
        let ListOfObject_time = new Date(ListOfObject.deliveryTimes);

        return (sum_time.getDay() == ListOfObject_time.getDay() &&
          sum_time.getMonth() == ListOfObject_time.getMonth() &&
          sum_time.getFullYear() == ListOfObject_time.getFullYear());
      });
      if (index >= 0) { // if in list do something
        //_sum[index].qty += ListOfObject.qty;
        _sum[index].count += 1;
      }
      else {
        _sum.push({ deliveryTimes: ListOfObject.deliveryTimes, count: 1 })// if not in list do some thing
      }
    })
    _sum = _sum.sort((a, b) => a.week - b.week);
    console.log(_sum)//{week: 1, qty: 2, count: 2}, {week: 2, qty: 4, count: 2}
    return _sum;
  }

  public distinct_V2(_ListOfObject) {
    let _sum = [];
    var mapfoo = _ListOfObject.map(ListOfObject => {
      let index = _sum.findIndex(sum => sum.week == ListOfObject.week);
      if (index >= 0) { // if in list do something
        _sum[index].qty += ListOfObject.qty;
        _sum[index].count += 1;
      }
      else {
        _sum.push({ week: ListOfObject.week, qty: ListOfObject.qty, count: 1 })// if not in list do some thing
      }
    })
    _sum = _sum.sort((a, b) => a.week - b.week);
    console.log(_sum)//{week: 1, qty: 2, count: 2}, {week: 2, qty: 4, count: 2}
    return _sum;
  }

  public distinct_V1(ListOfValue) {
    let filtered_data = ListOfValue.map(item => item.week) //distinct
      .filter((value, index, self) => self.indexOf(value) === index);
    return filtered_data;
  }
  /////end distinct

  /////////////////////////
  // start CodeBox with loading
  public CreateCodeBox_(IsloadingShow=false) {
    let _Subscribe: any //declaration variable to unsubscribe if any error is occurred
    let _access: any = { access: false, data: [] }; // value that return to use in another function to determine whether date is complete or not
    let url = "http://localhost:44300/api/Merchandise/Search";// Url for get/post 
    let token = "this.AuthServiceProvider.token";// use to authenticate
    let body = { "IdentityId": "true" }; //the information which send to server
    if (body.IdentityId === null) { //Check data is valid or not
      return Observable.throw("Please insert body"); //throw "Please insert body"
    }
    else {
      if(IsloadingShow == true){
        this.presentLoadingCustom();
      }
      return Observable.create(observer => {
        _Subscribe = this.DataServiceProvider.PostData(url, body, token) //Call function PostData from data-service
          .subscribe(
            data => { //use the data to do something if data is not null
              if (data) {
                console.log("1 ", data);

                _access.access = true;
                observer.next(_access);
                observer.complete();
              }
              else { //use the data to do something if data is null
                console.log("2 ", data)
                _access.access = false;
                observer.error(new Error('CreateCodeBox Error!'));
              }
            },
            err => {
              console.log('Error handle', err);
              _access.access = false;
              _access.data = err;
            },//can add function to handle the action of error
            () => { console.log('CreateCodeBox Done'); } // when get data is completed. It will console.log('GetMerchandise Done')
          );
        setTimeout(() => observer.next(_access), 4000); //if there is no error, return _access
        setTimeout(() => observer.complete(), 4000); // notifies the Observer that the Observable has finished if there is no error.
        setTimeout(() => observer.error(new Error('CreateCodeBox Error!')), 4000); //throw Error
      }, err => console.error('observer : ', err))
        .subscribe(value => {
          if (value.access) {
            console.log("3 ", value)


            if(IsloadingShow == true){
              this.loadingView.dismiss();
            }
          }
          else {
            console.log("4 ", value)
            _Subscribe.unsubscribe();
          }
        }, error => { console.error(error.message) },
          () => { console.log('Completed subscribe') }
        )
    }
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
  // end CodeBox with loading
  //////////////////////////////

  //strat chart
  //lineChart 
  @ViewChild('linecharthome') linecharthome;
  public lineChartEl: any;
  linechartLabels: any[] = [];
  linechartValues: any[] = [[], []];
  linechartColours: any[] = [[], []];
  linechartHoverColours: any[] = [[], []];

  lineChartadddata(Labels, Values, color) {
    this.linechartLabels.push(Labels);
    this.linechartValues[0].push(Values);
    this.linechartValues[1].push(Values);
    this.linechartColours[0].push(color);
    this.linechartColours[1].push(color);
    this.linechartHoverColours[0].push(color);
    this.linechartHoverColours[1].push(color);
    this.lineChartEl.update();
  }
  createlineChart() {
    this.lineChartEl = new Chart(this.linecharthome.nativeElement,
      {
        type: 'line',
        data: {
          labels: this.linechartLabels,
          datasets: [{
            label: 'label TEXT',
            data: this.linechartValues[0],
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.linechartColours[0],
            hoverBackgroundColor: this.linechartHoverColours[0],
            fill: false
          },
          {
            label: 'label TEXT2',
            data: this.linechartValues[1],
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.linechartColours[1],
            hoverBackgroundColor: this.linechartHoverColours[1],
            fill: false
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: true,
            boxWidth: 80,
            fontSize: 15,
            padding: 0
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 50,
                max: 500
              }
            }],
            xAxes: [{
              ticks: {
                autoSkip: false
              }
            }]
          }
        }
      });
  }
  //end lineChart 
  //pieChart
  @ViewChild('pieCharthome') pieCharthome;
  public pieChartEl: any;
  piechartLabels: any[] = [1, 2, 3, 4];
  piechartValues: any[] = [10, 20, 30, 40];
  piechartColours: any[] = [];
  piechartHoverColours: any[] = [];

  pieChartadddata(Labels, Values) {
    this.piechartValues.push(Values);
    this.piechartLabels.push(Labels);
    this.pieChartEl.update();
  }
  createpieChart() {
    this.pieChartEl = new Chart(this.pieCharthome.nativeElement, {
      type: 'pie',
      data: {
        labels: this.piechartLabels,
        datasets: [{
          label: 'label TEXT',
          data: this.piechartValues,
          duration: 2000,
          easing: 'easeInQuart',
          backgroundColor: this.piechartColours,
          hoverBackgroundColor: this.piechartHoverColours
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: true,
          boxWidth: 80,
          fontSize: 15,
          padding: 0
        }

      }
    });
  }
  //end pieChart
  //barChart
  @ViewChild('barCharthome') barCharthome;
  public barChartEl: any;
  barchartLabels: any[] = [1, 2, 3, 4];
  barchartValues: any[] = [[10, 20, 30, 40], [50, 70, 10, 90]];
  barchartColours: any[] = [[], []];
  barchartHoverColours: any[] = [[], []];

  barChartadddata(Labels, Values) {
    this.barchartValues[0].push(Values);
    this.barchartValues[1].push(Values);
    this.barchartLabels.push(Labels);
    this.barChartEl.update();
  }
  createBarChart() {
    this.barChartEl = new Chart(this.barCharthome.nativeElement,
      {
        type: 'bar',
        data: {
          labels: this.barchartLabels,
          datasets: [{
            label: 'label TEXT',
            data: this.barchartValues[0],
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.barchartColours[0],
            hoverBackgroundColor: this.barchartHoverColours[0]
          },
          {
            label: 'label TEXT',
            data: this.barchartValues[1],
            duration: 2000,
            easing: 'easeInQuart',
            backgroundColor: this.barchartColours[1],
            hoverBackgroundColor: this.barchartHoverColours[1]
          }]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: true,
            boxWidth: 80,
            fontSize: 15,
            padding: 0
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                max: 100
              }
            }],
            xAxes: [{
              ticks: {
                autoSkip: false
              }
            }]
          }
        }
      });
  }
  //end barChart
  //doughnutChart
  @ViewChild('doughnutCharthome') doughnutCharthome;
  public doughnutChartEl: any;
  doughnutchartLabels: any[] = [];
  doughnutchartValues: any[] = [];
  doughnutchartColours: any[] = [];
  doughnutchartHoverColours: any[] = [];

  doughnutChartadddata(Labels, Values) {
    this.doughnutchartValues.push(Values);
    //this.doughnutchartLabels.push(txt2);
    //this.doughnutChartEl.update();
    this.doughnutChartEl.update();
  }

  createdoughnutChart() {
    this.doughnutChartEl = new Chart(this.doughnutCharthome.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.doughnutchartLabels,
        datasets: [{
          label: 'Report',
          data: this.doughnutchartValues,
          duration: 2000,
          easing: 'easeInQuart',
          backgroundColor: this.doughnutchartColours,
          hoverBackgroundColor: this.doughnutchartHoverColours
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: true,
          boxWidth: 80,
          fontSize: 15,
          padding: 0
        }

      }
    });
  }
  //end doughnutChart
  ionViewDidLoad() {
    if (this.AuthServiceProvider.CheckLogin()) {
      //this.createlineChart();
      this.createdoughnutChart();
      this.GetOrders(true);
      //this.createBarChart();
      //this.createpieChart();



    }
  }



  public logout() {
    this.AuthServiceProvider.logout().subscribe(succ => {
      //this.navCtrl.setRoot(LoginPage);
      this.appCtrl.getRootNav().setRoot(LoginPage);
    });
  }

}


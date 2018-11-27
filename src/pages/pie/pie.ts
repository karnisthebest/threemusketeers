import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'Chart.js';
/**
 * Generated class for the PiePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pie',
  templateUrl: 'pie.html',
})
export class PiePage {
  //pieChart
  @ViewChild('pieChart') pieChart;
  public pieChartEl: any;
  piechartLabels:any[] = [1,2,3,4];
  piechartValues:any[] = [10,20,30,40];
  piechartColours:any[] = [];
  piechartHoverColours:any[] = [];

  pieChartadddata(txt1,txt2){
    this.piechartValues.push(txt1);
    this.piechartLabels.push(txt2);
    this.pieChartEl.update();
  }
  createpieChart(){
    this.pieChartEl = new Chart(this.pieChart.nativeElement, {
      type: 'pie',
         data: {
            labels: this.piechartLabels,
            datasets: [{
               label                 : 'label TEXT',
               data                  : this.piechartValues,
               duration              : 2000,
               easing                : 'easeInQuart',
               backgroundColor       : this.piechartColours,
               hoverBackgroundColor  : this.piechartHoverColours
            }]
         },
         options : {
            maintainAspectRatio: false,
            legend         : {
               display     : true,
               boxWidth    : 80,
               fontSize    : 15,
               padding     : 0
            }
            
         }
      });
    }
  //end pieChart
  ionViewDidLoad() {
    this.createpieChart();
    console.log('ionViewDidLoad piePage');
  }





  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
}

import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'Chart.js';
/**
 * Generated class for the DoughnutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doughnut',
  templateUrl: 'doughnut.html',
})
export class DoughnutPage {
  //doughnutChart
  @ViewChild('doughnutChart') doughnutChart;
  public doughnutChartEl: any;
  doughnutchartLabels:any[] = [1,2,3,4];
  doughnutchartValues:any[] = [10,20,30,40];
  doughnutchartColours:any[] = [];
  doughnutchartHoverColours:any[] = [];

  doughnutChartadddata(txt1,txt2){
    this.doughnutchartValues.push(txt1);
    //this.doughnutchartLabels.push(txt2);
    //this.doughnutChartEl.update();
    this.doughnutChartEl.update();
  }

  createdoughnutChart(){
    this.doughnutChartEl = new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
         data: {
            labels: this.doughnutchartLabels,
            datasets: [{
               label                 : 'label TEXT',
               data                  : this.doughnutchartValues,
               duration              : 2000,
               easing                : 'easeInQuart',
               backgroundColor       : this.doughnutchartColours,
               hoverBackgroundColor  : this.doughnutchartHoverColours
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
  //end doughnutChart
  ionViewDidLoad() {
    this.createdoughnutChart();
    console.log('ionViewDidLoad DoughnutPage');
  }





  constructor(public navCtrl: NavController, public navParams: NavParams) {}

}

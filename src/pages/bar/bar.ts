import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'Chart.js';
/**
 * Generated class for the BarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bar',
  templateUrl: 'bar.html',
})
export class BarPage {
  //barChart
  @ViewChild('barChart') barChart;
  public barChartEl: any;
  barchartLabels:any[] = [1,2,3,4];
  barchartValues:any[] = [[10,20,30,40],[50,70,10,90]];
  barchartColours:any[] = [[],[]];
  barchartHoverColours:any[] = [[],[]];
  
  barChartadddata(txt1,txt2){
    this.barchartValues[0].push(txt1);
    this.barchartValues[1].push(txt1);
    this.barchartLabels.push(txt2);
    this.barChartEl.update();
  }
  createBarChart()
   {
      this.barChartEl = new Chart(this.barChart.nativeElement,
      {
         type: 'bar',
         data: {
            labels: this.barchartLabels,
            datasets: [{
               label                 : 'label TEXT',
               data                  : this.barchartValues[0],
               duration              : 2000,
               easing                : 'easeInQuart',
               backgroundColor       : this.barchartColours[0],
               hoverBackgroundColor  : this.barchartHoverColours[0]
            },
            {
              label                 : 'label TEXT',
              data                  : this.barchartValues[1],
              duration              : 2000,
              easing                : 'easeInQuart',
              backgroundColor       : this.barchartColours[1],
              hoverBackgroundColor  : this.barchartHoverColours[1]
           }]
         },
         options : {
            maintainAspectRatio: false,
            legend         : {
               display     : true,
               boxWidth    : 80,
               fontSize    : 15,
               padding     : 0
            },
            scales: {
               yAxes: [{
                  ticks: {
                     beginAtZero:true,
                     stepSize: 5,
                     max : 100
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
  ionViewDidLoad() {
    this.createBarChart();
    console.log('ionViewDidLoad BarPage');
  }



  constructor(public navCtrl: NavController, public navParams: NavParams) { }
}

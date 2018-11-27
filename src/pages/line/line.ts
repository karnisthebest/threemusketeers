import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Chart} from 'Chart.js';

/**
 * Generated class for the LinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-line',
  templateUrl: 'line.html',
})
export class LinePage {
  //lineChart 
  @ViewChild('lineChart') lineChart;
  public lineChartEl: any;
  linechartLabels:any[] =[1,2,3,4];
  linechartValues:any[] = [[10,20,30,40],[50,70,10,90]];
  linechartColours:any[] = [[],[]];
  linechartHoverColours:any[] = [[],[]];
  
  lineChartadddata(txt1,txt2){
    this.linechartLabels.push(txt2);
    this.linechartValues[0].push(txt1);
    this.linechartValues[1].push(txt1);
    this.lineChartEl.update();
  }
  createlineChart()
   {
      this.lineChartEl = new Chart(this.lineChart.nativeElement,
      {
         type: 'line',
         data: {
            labels: this.linechartLabels,
            datasets: [{
               label                 : 'label TEXT',
               data                  : this.linechartValues[0],
               duration              : 2000,
               easing                : 'easeInQuart',
               backgroundColor       : this.linechartColours[0],
               hoverBackgroundColor  : this.linechartHoverColours[0],
               fill 				   : false
            },
            {
              label                 : 'label TEXT2',
              data                  : this.linechartValues[1],
              duration              : 2000,
              easing                : 'easeInQuart',
              backgroundColor       : this.linechartColours[1],
              hoverBackgroundColor  : this.linechartHoverColours[1],
              fill 				   : false
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
   //end lineChart 
  ionViewDidLoad() {
    this.createlineChart();
    console.log('ionViewDidLoad BarPage');
  }


  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  
}

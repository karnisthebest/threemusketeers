import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Chart} from 'Chart.js';
/*
  Generated class for the ChartServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartServiceProvider {

  //LineChart Data
  public lineChartEl: any;
  linechartLabels:any[] =[1,2,3,4];
  linechartValues:any[] = [[10,20,30,40],[50,70,10,90]];
  linechartColours:any[] = [[],[]];
  linechartHoverColours:any[] = [[],[]];
  //End LineChart Data
  //Add lineChart Data function
  linechartadddata(txt1,txt2){
    this.linechartLabels.push(txt2);
    this.linechartValues[0].push(txt1);
    this.linechartValues[1].push(txt1);
    this.lineChartEl.update();
  }
  //End Add lineChart Data function
  //Create line Chart funtion linechart =>  @ViewChild('lineChart') lineChart; 
  createlineChart(lineChart)
   {
      this.lineChartEl = new Chart(lineChart.nativeElement,
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


  constructor() {
    console.log('Hello ChartServiceProvider Provider');
  }

}

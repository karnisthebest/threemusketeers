import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { IOrder } from '../../shared/Order.model';
import { Observable } from 'rxjs/Observable';
import { IMerchandise } from '../../shared/Merchandise.model'
import { AuthServiceProvider } from '../auth-service/auth-service'
import { filterQueryId } from '@angular/core/src/view/util';
/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  //public Url = "";

  varfilterall:any = {order:'',filter:'',range:'',orderIsCanceled:null};// use in Order-view;
  constructor(public HttpClient: HttpClient, private AuthServiceProvider: AuthServiceProvider) {
    //console.log('Hello DataServiceProvider Provider');

  }
  //use this example 
  public GetData(url, token) { //HTTP Methods GET
    return this.HttpClient.get<any>(url, { headers: new HttpHeaders().set('Authorization', token) });
  }
  public PostData(url, body, token) { //HTTP Methods POST
    return this.HttpClient.post<any>(url, body, {
      headers: new HttpHeaders()
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
    });

  }

  filter:any
  public GetFilter(){
    return this.filter;
  }

  public AssignFilter(){
    return this.filter;
  }


  












  //do not use unstable version
  getData(url, token) {
    const req = new HttpRequest('GET', url, {
      reportProgress: true,
      headers: new HttpHeaders().set('Authorization', token)
    });

    this.HttpClient.request(req).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request sent!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header received!');
          break;
        case HttpEventType.DownloadProgress:
          const kbLoaded = Math.round(event.loaded / 1024);
          console.log(`Download in progress! ${kbLoaded}Kb loaded`);
          break;
        case HttpEventType.Response:
          console.log('😺 Done!', event.body);
      }
    });
  }
  //Not not use


}

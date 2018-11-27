import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { LoadingController } from 'ionic-angular';




/*
  Generated class for the HelperServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperServiceProvider {

  constructor(public HttpClient: HttpClient, private loadingCtrl: LoadingController,
    private DataServiceProvider: DataServiceProvider,
    private AuthServiceProvider: AuthServiceProvider) {
    console.log('Hello HelperServiceProvider Provider');
  }

  fun2() {
    console.log("fun2")
  }

  public HTTP_errorhandle(HttpErrorResponse:any){
    let error = {title:'',
                message:'',
                status:''
              };
    error.title = HttpErrorResponse.name;
    error.message = HttpErrorResponse.message;
    error.status = HttpErrorResponse.statusText;
    return error;    
  }

  public PostData(option: {
    url?: any,
    token?: any,
    body?: any,
    timesout?: number,
    headers?:HttpHeaders
  }): any {
    let url = (option.url != null ? option.url : "http://localhost:44300/api/Merchandise/Search");
    let body = (option.body != null ? option.body : { "IdentityId": "true" })
    let token = (option.token != null ? option.token : this.AuthServiceProvider.token);
    let timeout = (option.timesout > 0 ? option.timesout : 4000);
    let headers = (option.headers != null ? option.headers : new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/json'))
    let _Subscribe: any //declaration variable to unsubscribe if any error is occurred
    let _access: any = { access: false, data: [], row: [], md5: [], error: [] }; // value that return to use in another function to determine whether date is complete or not

    if (body.IdentityId === null) { //Check data is valid or not
      return Observable.throw("Please insert body"); //throw "Please insert body"
    }
    else {
      return Observable.create(observer => {
        _Subscribe = this.HttpClient.post<any>(url, body, {headers: headers}) //Call function PostData from data-service
          .subscribe(
            data => {
              if (data) {
                _access.access = true;
                _access.data = data.data;
                _access.row = data.row;
                _access.md5 = data.md5;
                observer.next(_access);
                observer.complete();
              }
              else { 
                _access.access = false;
                _access.error = "data is null";
                observer.next(_access);
                observer.error(new Error('PostData Error!'));
                observer.complete();
                _Subscribe.unsubscribe();
              }
            },
            err => {
              _access.access = false;
              _access.data = err;
              _access.error = err;
              observer.next(_access);
              observer.error(new Error(err));
              observer.complete();
              _Subscribe.unsubscribe();
            },//can add function to handle the action of error
            () => { console.log('PostData Done'); } // when get data is completed. It will console.log('GetMerchandise Done')
          );
        setTimeout(() => {
          //_access.data = "Timesout";
          //_access.error = "Timesout";
          _Subscribe.unsubscribe();
          observer.next(_access);
          observer.complete();
        }, timeout);
      }, err => console.error('observer : ', err));
    }
  }

  
  public GetData(option: {
    url?: any,
    token?: any,
    timesout?: number,
    headers?:HttpHeaders
  }): any {
    let url = (option.url != null ? option.url : "http://localhost:44300/api/Merchandise/Search");
    let token = (option.token != null ? option.token : this.AuthServiceProvider.token);
    let timeout = (option.timesout > 0 ? option.timesout : 4000);
    let headers = (option.headers != null ? option.headers : new HttpHeaders().set('Authorization', token))
    let _Subscribe: any //declaration variable to unsubscribe if any error is occurred
    let _access: any = { access: false, data: [], row: [], md5: [], error: [] }; // value that return to use in another function to determine whether date is complete or not

    if (url === null) { //Check data is valid or not
      return Observable.throw("Please insert url"); //throw "Please insert body"
    }
    else {
      return Observable.create(observer => {
        _Subscribe = this.HttpClient.get<any>(url, {headers: headers}) //Call function PostData from data-service
          .subscribe(
            data => {
              if (data) {
                _access.access = true;
                _access.data = data.data;
                _access.row = data.row;
                _access.md5 = data.md5;
                observer.next(_access);
                observer.complete();
              }
              else { 
                _access.access = false;
                _access.error = "data is null";
                observer.next(_access);
                observer.error(new Error('GetData Error!'));
                observer.complete();
                _Subscribe.unsubscribe();
              }
            },
            err => {
              _access.access = false;
              _access.data = err;
              _access.error = err;
              observer.next(_access);
              observer.error(new Error(err));
              observer.complete();
              _Subscribe.unsubscribe();
            },//can add function to handle the action of error
            () => { console.log('GetData Done'); } // when get data is completed. It will console.log('GetMerchandise Done')
          );
        setTimeout(() => {
          //_access.data = "Timesout";
          //_access.error = "Timesout";
          _Subscribe.unsubscribe();
          observer.next(_access);
          observer.complete();
        }, timeout);
      }, err => console.error('observer : ', err));
    }
  }

  









}

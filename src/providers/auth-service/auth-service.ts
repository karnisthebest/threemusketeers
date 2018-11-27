import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ILogin } from '../../shared/Login.model'
import { App } from 'ionic-angular';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  // Change to this http://ed43bb3b.ngrok.io/api/login
  //static readonly LOGIN_URL = 'https://angularfulfillment20180912121345.azurewebsites.net/api/Accounts/Login';
  static readonly LOGIN_URL = 'http://localhost:44300/api/Accounts/Login';
  // Change to this http://ed43bb3b.ngrok.io/api/register
  static readonly REGISTER_URL = 'http://localhost:44300/api/Accounts/Register';
  public access: any= {access:false,data:[]};
  public accessregister: boolean;
  public token: string = "Waiting";
  public RegisterIsDone: boolean = false;

  constructor(public http: Http,
    public storage: Storage,
    public HttpClient: HttpClient,
    public appCtrl: App
  ) {
    //console.log('Hello AuthServiceProvider Provider');

  }
  LoginSubscribe: any
  public login(credentials) {
    localStorage.clear();
    if (credentials.UserName === null || credentials.Password === null) {
      return Observable.throw("Please insert credentials.");
    }
    else {
      return Observable.create(observer => {
        credentials.LoginBy = 'ios';//force setting login to 'ios'
        this.LoginSubscribe = this.HttpClient.post<ILogin>(AuthServiceProvider.LOGIN_URL, credentials)
          .subscribe(
            data => {
              if (data.auth_token) {
                localStorage.setItem('User_Token', 'Bearer ' + data.auth_token);
                this.token = 'Bearer ' + data.auth_token;
                //console.log('getItem done ', localStorage.getItem('User_Token'));
                //console.log('this token done ', this.token);
                
                this.access.access = true;
                observer.next(this.access);
                observer.complete();
              }
              else {
                this.access.access = false;
                observer.error(new Error('Error : ERR_CONNECTION_REFUSED'));
                observer.complete();
              }
            },
            err => { console.log('Error2', err); 
                    this.access.access = false;
                    this.access.data = err;
                    },
            () => { console.log('Login Done'); }
          );
        setTimeout(() => observer.next(this.access), 4000);
        //setTimeout(() => observer.complete(), 4000);
        setTimeout(() => observer.error(new Error('Error : ERR_CONNECTION_REFUSED')), 4000);
      }, err => console.error('observer : ', err))

    }
  }



  // Register
  RegisterSubscribe: any;
  public register(credentials) {
    if (credentials.name === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {

        this.RegisterSubscribe = this.HttpClient.post<any>(AuthServiceProvider.REGISTER_URL, credentials)
          .subscribe(data => {
            if (data.succeeded) {
              //this.RegisterIsDone = true;
              this.accessregister = true;
              console.log("Create Account", data);
              //console.log(data);
            }
            else {
              //this.RegisterIsDone = false;
              this.accessregister = false;
              console.log("Create Account", data);
            }
          },
            err => { console.log('Register', err); },
            () => { console.log('Register Done'); }
          );
        setTimeout(() => { observer.next(this.accessregister); }, 4000);
        setTimeout(() => { observer.complete(); }, 5000);
        setTimeout(() => observer.error(new Error('Oops!')), 10000);

      });
    }
  }


  // Get Token
  public getToken() {
    return this.token;
  }

  // Logout
  public logout() {
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  public CheckLogin():boolean{
    if(this.token == "Waiting"){
      this.logout().subscribe(succ => {
        //this.navCtrl.setRoot(LoginPage);
        this.appCtrl.getRootNav().setRoot("LoginPage");
        return true;
      });
    }
    return true;
  }

  //OLD http Login

  public loginold(credentials) {
    localStorage.clear();
    if (credentials.UserName === null || credentials.Password === null) {
      return Observable.throw("Please insert credentials.");
    }
    else {
      return Observable.create(observer => {
        credentials.LoginBy = 'ios';//force setting login to 'ios'
        let response = this.http.post(AuthServiceProvider.LOGIN_URL, credentials).map(res => res.json())
          .subscribe(
            data => {
              if (data.auth_token) {
                localStorage.setItem('User_Token', 'Bearer ' + data.auth_token);
                this.token = 'Bearer ' + data.auth_token;
                //console.log('getItem done ', localStorage.getItem('User_Token'));
                //console.log('this token done ', this.token);
                this.access = true;
              }
              else { this.access = false; }
            },
            err => { console.log('Error', err); },
            () => { console.log('Login Done'); }
          );
        setTimeout(() => { observer.next(this.access); }, 2500);
        setTimeout(() => { observer.complete(); }, 5000);
        setTimeout(() => observer.error(new Error('Oops!')), 10000)
      }, err => console.error('observer : ', err))
    }
  }

}

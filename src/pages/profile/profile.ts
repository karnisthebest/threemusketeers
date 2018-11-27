import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import {DataServiceProvider} from '../../providers/data-service/data-service';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
 
})
export class ProfilePage {
  raw = {
    "row": 1,
    "md5": "849F5275289A4BC2029E27EAE0EC3069",
    "data": [
        {
            "firstName": "erverve",
            "lastName": "erverv",
            "address": "werverv",
            "address2": "wrvwvwrv",
            "city": "wrvwrtyuio",
            "country": "rtyuiop",
            "gender": "m",
            "zipCode": "2345",
            "userName": "tedxabac@gmail.com",
            "isCanceled": null,
            "phoneNumber": null
        }
    ]
};
  profile_data: any = this.raw.data;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,private DataServiceProvider: DataServiceProvider,
     private AuthServiceProvider :AuthServiceProvider) {
  }





  /////////////////////////
  // start CodeBox
  public CreateCodeBox() {
    let _Subscribe: any //declaration variable to unsubscribe if any error is occurred
    let _access: any= {access:false,data:[]}; // value that return to use in another function to determine whether date is complete or not
    let url = "https://localhost:44300/api/Accounts/Profile";// Url for get/post 
    let token = this.AuthServiceProvider.token;// use to authenticate
    let body = { "IdentityId": "true" }; //the information which send to server
    if (body.IdentityId === null) { //Check data is valid or not
      return Observable.throw("Please insert body"); //throw "Please insert body"
    }
    else {
      return Observable.create(observer => {
        _Subscribe = this.DataServiceProvider.PostData(url, body,token) //Call function PostData from data-service
          .subscribe(
            data => { //use the data to do something if data is not null
              if (data) {
                console.log("1 ",data);

                _access.access = true;
              }
              else { //use the data to do something if data is null
                console.log("2 ",data)
                _access.access = false;
              }
            },
            err => { console.log('Error handle', err);
                    _access.access = false;
                    _access.data = err;
                    },//can add function to handle the action of error
            () => { console.log('CreateCodeBox Done'); } // when get data is completed. It will console.log('GetMerchandise Done')
          );
        setTimeout(() => observer.next(_access), 4000); //if there is no error, return _access
        setTimeout(() => observer.complete(), 4000); // notifies the Observer that the Observable has finished if there is no error.
        setTimeout(() => observer.error(new Error('CreateCodeBox Error!')), 4000); //throw Error
      }, err => console.error('observer : ', err))
      .subscribe(value=> {
        if(value[0].access){
          console.log("3 ",value)
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}

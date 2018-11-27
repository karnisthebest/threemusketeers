import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { Email: '', Password: '', ConfirmPassword: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, private AuthServiceProvider: AuthServiceProvider,
    private alertCtrl: AlertController) {
  }


  //// NEED TO ADD regx !!!!!!!!!! ///////
  public register() {
    if (this.registerCredentials.Password != this.registerCredentials.ConfirmPassword) {
      this.showPopup("Error", 'The password confirmation does not match.');
    }
    else {
      this.AuthServiceProvider.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
          this.navCtrl.setRoot(LoginPage);
        } else {
          this.AuthServiceProvider.RegisterSubscribe.unsubscribe();
          this.showPopup("Error", "Email is used.");
        }
      },
        error => {
          this.showPopup("Error", error);
        });
    }
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

  }

}

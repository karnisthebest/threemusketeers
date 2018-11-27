import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.sกdddeedddddddsdsddeeddddddddddd
 * 
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  registerCredentials = { UserName: 'tedxabac@gmail.com', Password: '@Max049588345', LoginBy: '' }; //remove data mockup later
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }
  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }
  logo: any = {pic:"../../assets/imgs/logo_mystore.png"};
  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(
      value => {
        if (value.access) {
          console.log('001',value);

          this.navCtrl.setRoot(TabsPage);
        }
        else if (localStorage.getItem('User_Token') == this.auth.token) {
          console.log('002',value);

          this.navCtrl.setRoot(TabsPage);
        }
        else {
          console.log('003',value);
          this.auth.LoginSubscribe.unsubscribe();
          this.showError("These credentials do not match our records.");

        }
      },
      error => {
        console.error(error.message)
      },
      () => console.log('Completed!')
    )


  }



  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

}

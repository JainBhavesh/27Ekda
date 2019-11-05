import { Component } from '@angular/core';

import { Platform, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FirebaseCRUDService } from './service/curd/firebase-crud.service';
import { Router } from '@angular/router';
import { AlertModule } from './Module/alert/alert.module';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public version: any = '';
  public userData: any;
  public appPages = [
    {
      title: 'Home',
      url: '/my-calendar',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Donors',
      url: '/donors',
      icon: 'wallet'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public alertModule: AlertModule,
    public navCtrl: NavController
  ) {
    this.initializeApp();
    if (localStorage.phoneNo !== undefined) {
      this.navCtrl.navigateRoot('my-calendar');
    } else {
      this.navCtrl.navigateRoot('login');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.handleHardwareBackButton();
    });
  }

  handleHardwareBackButton() {
    this.platform.backButton.subscribe((event: any) => {
      if (this.router.url === '/login') {
        navigator['app'].exitApp();
      } else if (
        this.router.url !== '/register' &&
        this.router.url !== '/check-otp' &&
        this.router.url !== '/forgot-password' &&
        this.router.url !== '/change-password'
      ) {
        this.alertModule.openConfirm(
          'Exit App',
          'Are you sure exit App',
          'Exit',
          (returnValue: any) => {
            if (returnValue === 'Success') {
              navigator['app'].exitApp();
            }
          }
        );
      }
    });
  }

  logout() {
    localStorage.setItem('isLogin', 'false');
  }
}

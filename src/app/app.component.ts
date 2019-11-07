import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AlertModule } from './Module/alert/alert.module';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { BasicService } from './service/Basic/basic.service';
import { Storage } from '@ionic/storage';

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
    }, {
      title: 'News',
      url: '/news-list',
      icon: 'wallet'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public alertModule: AlertModule,
    public navCtrl: NavController,
    private push: Push,
    public bs: BasicService,
    public storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.bs.getUserData();
      this.storage.get('userData').then(data => {
        if (data != null) {
          this.navCtrl.navigateRoot('my-calendar');
        } else {
          this.navCtrl.navigateRoot('login');
        }
      });
      this.splashScreen.hide();
      this.handleHardwareBackButton();
      // this.pushNotifictions();
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
    const data = {
      user_id: localStorage.userID,
      device_token: this.bs.deviceToken
    }
    this.bs.hitApi('post', 'user/log-out', data).subscribe((response: any) => {
      localStorage.removeItem('phoneNo');
      localStorage.removeItem('userID');
      this.storage.remove('userData');
      this.bs.token = '27ekda_auth';
    });
  }

  pushNotifictions() {
    const options: PushOptions = {
      android: {
        senderID: '690486240690'
      },
      browser: {},
      ios: {
        sound: true,
        badge: true
      },
      windows: {},

    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {

      console.log('Device registered' + data);
      console.log('Device registrationId ' + data.registrationId);

      this.bs.deviceToken = data.registrationId;
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('Received a notification ' + JSON.stringify(data));
      var extraData = JSON.parse(JSON.stringify(data.additionalData));
      if (data.additionalData.foreground) {
        // if application open
        console.log('in foreground');

      } else {
        // In background
        // setTimeout(() => {
        //   this.navCtrl.navigateForward('');
        // }, 2000);
      }
    });


    pushObject.on('error').subscribe(error => {
      console.error('Error with Push plugin' + JSON.stringify(error));
    });

  }
}

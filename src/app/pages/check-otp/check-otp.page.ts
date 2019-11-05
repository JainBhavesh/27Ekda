import { Component } from '@angular/core';
import * as $ from 'jquery';
import { NavController } from '@ionic/angular';
import { AlertModule } from '../../Module/alert/alert.module';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-check-otp',
  templateUrl: './check-otp.page.html',
  styleUrls: ['./check-otp.page.scss'],
})
export class CheckOtpPage {
  public otpArr: any = [];
  public otp: number;
  constructor(
    public router: Router,
    public navCtrl: NavController,
    public alert: AlertModule,
  ) {
  }

  ionViewWillEnter() {
    this.otp = 1234;
  }

  otpFormSubmit() {
    $('input[type=hidden][name=otpHidden]').each((i, val: any) => {
      this.otpArr.push(val.value);
    });
    const self = this;
    setTimeout(() => {
      console.log(self.otpArr.toString().replace(/,/g, ''));
      const inputOTP = self.otpArr.toString().replace(/,/g, '');
      if (inputOTP == self.otp) {
        self.navCtrl.navigateRoot('profile', {
          queryParams: {
            cno: { cno: localStorage.phoneNo }
          }
        });
      } else {
        self.alert.openAlert('Ekda', 'Please enter valid OTP', 'OK').then(() => {
          self.otpArr = [];
        });
      }
    }, 1000);
  }

  otpController(event, next, prev) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus();
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    } else {
      return 0;
    }
  }

  resendCode() {

  }
}

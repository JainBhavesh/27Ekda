import { Component } from '@angular/core';
import * as $ from 'jquery';
import { NavController } from '@ionic/angular';
import { AlertModule } from '../../Module/alert/alert.module';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { BasicService } from 'src/app/service/Basic/basic.service';
@Component({
  selector: 'app-check-otp',
  templateUrl: './check-otp.page.html',
  styleUrls: ['./check-otp.page.scss'],
})
export class CheckOtpPage {
  public otpArr: any = [];
  public otp: number;
  mobileNo: any;
  userExist: any;
  constructor(
    public router: Router,
    public navCtrl: NavController,
    public alert: AlertModule,
    public bs: BasicService,
    public activated: ActivatedRoute
  ) {
    this.activated.queryParams.subscribe(data => {
      this.otp = data.otp;
      this.mobileNo = data.phone_no;
      this.userExist = data.is_user_exist;
    });
    this.bs.getDeviceType();
  }

  ionViewWillEnter() {
    // this.otp = 1234;
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
        const data = {
          is_user_exist: this.userExist,
          phone_no: this.mobileNo,
          device_type: this.bs.deviceType,
          device_token: this.bs.deviceToken
        }
        this.bs.hitApi('post',
          'user/check-otp',
          data,
        ).subscribe((receivedData: any) => {
          // if (receivedData.status) {
          //   this.bs.setUserData(receivedData.data);
          //   if (this.userExist == true) {
          //     self.navCtrl.navigateRoot('my-calendar');
          //   } else {
          //     self.navCtrl.navigateRoot('profile', {
          //       queryParams: {
          //         cno: { cno: localStorage.phoneNo }
          //       }
          //     });
          //   }
          // }
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

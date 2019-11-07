import { Component, NgZone } from '@angular/core';
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
    public activated: ActivatedRoute,
    public navCtrl: NavController,
    public alert: AlertModule,
    public bs: BasicService,
    public zone: NgZone
  ) {
    this.activated.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state.user) {
        const data = this.router.getCurrentNavigation().extras.state.user;
        this.zone.run(() => {
          this.otp = data.otp;
          this.mobileNo = data.phone_no;
          this.userExist = data.is_user_exist;
        })
      }
    });
    this.bs.getDeviceType();
  }

  otpFormSubmit() {
    try {
      this.bs.showLoader();
      $('input[type=hidden][name=otpHidden]').each((i, val: any) => {
        this.otpArr.push(val.value);
      });
      const self = this;
      setTimeout(() => {
        const inputOTP = self.otpArr.toString().replace(/,/g, '');
        if (inputOTP == self.otp) {
          const data = {
            is_user_exist: self.userExist,
            phone_no: self.mobileNo,
            device_type: self.bs.deviceType,
            device_token: self.bs.deviceToken
          }
          self.bs.hitApi('post', 'check-otp', data).subscribe((receivedData: any) => {
            self.bs.DismissLoader();
            if (receivedData.status) {
              this.bs.setUserData(receivedData.data);
              if (this.userExist == true) {
                self.navCtrl.navigateRoot('my-calendar');
              } else {
                self.navCtrl.navigateRoot('profile', {
                  queryParams: {
                    cno: { cno: localStorage.phoneNo }
                  }
                });
              }
            }
          }, error => {
            self.bs.DismissLoader();
            console.log(error);
            self.alert.openAlert('Ekda', 'Error from server side..', 'OK');
          });
        } else {
          self.bs.DismissLoader();
          self.alert.openAlert('Ekda', 'Please enter valid OTP', 'OK').then(() => {
            self.otpArr = [];
          });
        }
      }, 1000);
    } catch (error) {
      console.log(error);
      this.bs.DismissLoader();
    }
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
}

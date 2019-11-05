import { Component } from '@angular/core';
import { MenuController, NavController, Events } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModule } from '../../Module/alert/alert.module';
import { LoaderModule } from '../../Module/loader/loader.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  public loginForm: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';
  constructor(
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public alertModule: AlertModule,
    public navCtrl: NavController,
    public loader: LoaderModule,
    public events: Events
  ) {
    this.menuCtrl.enable(false);
    this.loginForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  ionViewWillEnter() {
  }

  loginformSubmit(val: any) {
    // if (val.value.remember === true || val.value.remember === 'true') {
    //   localStorage.setItem('isRemember', 'true');
    // } else {
    //   localStorage.setItem('isRemember', 'false');
    // }
    // if (localStorage.storeUserData === undefined) {
    //   this.alertModule.openAlert('Ekda', 'Please Register contact number', 'Ok');
    // } else {
    //   const data = JSON.parse(localStorage.storeUserData);
    //   let filterData = data.filter(item => item.phoneNumber == val.value.phone);
    //   if (filterData.length === 0) {
    //     this.alertModule.openAlert('Ekda', 'Please Register contact number', 'Ok');
    //   } else {
    //     localStorage.isLogin = true;
    //     localStorage.userLoginDetails = JSON.stringify(val.value);
    //     localStorage.removeItem('phoneNo');
    //     this.navCtrl.navigateRoot(['my-calendar']);
    //   }
    // }
    localStorage.phoneNo = val.value.phone;
    this.navCtrl.navigateForward('check-otp');
  }
}

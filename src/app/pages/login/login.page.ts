import { Component } from '@angular/core';
import { MenuController, NavController, Events } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModule } from '../../Module/alert/alert.module';
import { LoaderModule } from '../../Module/loader/loader.module';
import { BasicService } from 'src/app/service/Basic/basic.service';
import { HTTP } from '@ionic-native/http/ngx';

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
    public events: Events,
    public bs: BasicService,
    public http: HTTP
  ) {
    this.menuCtrl.enable(false);
    this.loginForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  ionViewWillEnter() {
  }

  loginformSubmit(val: any) {
    const data = {
      phone_no: this.loginForm.value.phone
    };
    this.bs.hitApi('post','register',data).subscribe((receivedData: any) => {
        // if (receivedData.status) {
        //   this.navCtrl.navigateForward('check-otp', {
        //     queryParams: {
        //       data: receivedData.data
        //     }
        //   });
        // }
        console.log(receivedData);
      });
  }
}

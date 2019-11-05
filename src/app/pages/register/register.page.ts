import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseCRUDService } from '../../service/curd/firebase-crud.service';
import { AlertModule } from '../../Module/alert/alert.module';
import { LoaderModule } from '../../Module/loader/loader.module';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  public signupForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public crudService: FirebaseCRUDService,
    public alertModule: AlertModule,
    public navCtrl: NavController,
    public loader: LoaderModule
  ) {
    // this.menuCtrl.enable(false);
    this.signupForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  signupFormSubmit(val: any) {
    try {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      localStorage.randomNumber = randomNum;
      localStorage.phoneNo = val.value.phone;
      this.navCtrl.navigateRoot(['check-otp']);
    } catch (error) {

    }
  }
}

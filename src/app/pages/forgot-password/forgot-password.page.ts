import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import { AlertModule } from '../../Module/alert/alert.module';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage {
  public forgotPasswordForm: FormsModule;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alert: AlertModule
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  forgotPasswordformSubmit(val: any) {
    console.log(val.value);
  }
}

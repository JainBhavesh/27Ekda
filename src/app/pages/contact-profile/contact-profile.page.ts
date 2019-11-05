import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.page.html',
  styleUrls: ['./contact-profile.page.scss'],
})
export class ContactProfilePage {

  public userImage: any;
  public profileForm: FormGroup;
  public profileData: any;
  public phno: any;
  userData: any = {};
  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public navCtrl: NavController
  ) {
    this.profileForm = this.formBuilder.group({
      profileId: '',
      cno: '',
      fname: '',
      mname: '',
      lname: '',
      gender: '',
      dob: '',
      mail: '',
      address: '',
      suburbLists: '',
      area: '',
      pinCode: '',
      motherName: '',
    });
    this.route.queryParams.subscribe(params => {
      if (params.data) {
        this.userData = params.data;
        console.log('UserData => ', this.userData);
        this.profileForm.patchValue(params.data);
        this.userImage = params.data.profileId;
      } else {
        this.navCtrl.pop();
      }
    });
  }

}

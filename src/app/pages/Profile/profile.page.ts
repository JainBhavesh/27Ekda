import { LoaderModule } from '../../Module/loader/loader.module';
import { Component } from '@angular/core';
import { ActionSheetController, NavController, Events } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Base64 } from '@ionic-native/base64/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModule } from '../../Module/alert/alert.module';
import { BasicService } from 'src/app/service/Basic/basic.service';
import { Storage } from '@ionic/storage';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  public userImage: any;
  public profileForm: FormGroup;
  public profileData: any;
  public phno: any;
  public userDetails: any = localStorage.storeUserData === undefined ? '' : JSON.parse(localStorage.storeUserData);
  constructor(
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public crop: Crop,
    public formBuilder: FormBuilder,
    public loader: LoaderModule,
    public base64: Base64,
    public router: Router,
    public route: ActivatedRoute,
    public alert: AlertModule,
    public navCtrl: NavController,
    public bs: BasicService,
    public storage: Storage,
    public _DomSanitizer: DomSanitizer,
    public event: Events
  ) {
    this.profileForm = this.formBuilder.group({
      profile_pic: '',
      phone_no: '',
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      sur_name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      pin_code: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      education: [''],
      occupation: [''],
      marital_status: ['', Validators.required],
      phone_home: ['', Validators.required],
      phone_office: ['', Validators.required],
      phone_other: ['', Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.cno) {
        this.profileForm.patchValue(params.cno);
      } else {
        this.storage.get('userData').then(data => {
          this.profileForm.patchValue(data);
          this.userImage = data.profile_pic;
        });
      }
    });
  }

  ionViewWillEnter() {
    
  }


  showactionSheet() {
    this.actionSheetController
      .create({
        header: 'Change Profile Photo',
        buttons: [
          {
            text: 'Remove Current Photo',
            role: 'destructive',
            handler: () => {
              this.profileFormSubmit(this.profileData);
            }
          },
          {
            text: 'Take Photo',
            handler: () => {
              this.openCamera('Take Photo');
            }
          },
          {
            text: 'Choose from Library',
            handler: () => {
              this.openCamera('Choose from Library');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => { }
          }
        ]
      })
      .then((actionSheetController: any) => {
        actionSheetController.present();
      });
  }

  openCamera(val: any) {
    if (val === 'Take Photo') {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(options).then(
        imageData => {
          this.cropImage(imageData);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        allowEdit: true
      };
      this.camera.getPicture(options).then(
        imageData => {
          this.cropImage(imageData);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  cropImage(val: any) {
    this.crop
      .crop(val, { quality: 100 })
      .then(
        newImage => this.convertBase64(newImage),
        error => console.error('Error cropping image', error)
      );
  }

  convertBase64(val: any) {
    this.base64.encodeFile(val).then(
      (base64File: string) => {
        this.userImage = base64File;
      },
      err => {
        console.log(err);
      }
    );
  }

  profileFormSubmit(val: any) {
    this.bs.showLoader();
    val.value.profileId = this.userImage;
    // tslint:disable-next-line: radix
    val.value.phone_no = Number(val.value.phone_no);
    if (val.value) {
      // this.alert.showToast('Your profile update successfully.', 'top', 5000);
      const uservalue = val.value;
      const userId = {
        user_id: this.bs.userId
      };
      const data = Object.assign(uservalue, userId);
      this.bs.hitApi('post', 'user/update-profile', data).subscribe((receivedData: any) => {
        this.bs.setUserData(receivedData.data);
        this.alert.showToast('Your profile update successfully.', 'top', 2000);
        this.navCtrl.navigateRoot(['/my-calendar']);
        this.event.publish('setUserData')
      }, error => {
        this.bs.DismissLoader();
        console.log(error);
      });
    } else {
      this.alert.showToast('Please enter proper value.', 'top', 2000);
    }
  }
}

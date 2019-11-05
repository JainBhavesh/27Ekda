import { LoaderModule } from '../../Module/loader/loader.module';
import { Component } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { Crop } from '@ionic-native/crop/ngx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Base64 } from '@ionic-native/base64/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModule } from '../../Module/alert/alert.module';
import { BasicService } from 'src/app/service/Basic/basic.service';
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
    public http: HttpClient,
    public crop: Crop,
    public formBuilder: FormBuilder,
    public loader: LoaderModule,
    public base64: Base64,
    public router: Router,
    public route: ActivatedRoute,
    public alert: AlertModule,
    public navCtrl: NavController,
    public bs: BasicService
  ) {
    this.profileForm = this.formBuilder.group({
      profileId: '',
      cno: '',
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      suburbLists: ['', Validators.required],
      area: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      motherName: '',
      // siblings: '',
    });
    this.route.queryParams.subscribe(params => {
      if (params.data) {
        this.profileForm.patchValue(params.data);
      } else if (params.cno) {
        this.profileForm.patchValue(params.cno);
      } else {
        const userData = localStorage.getItem('userData');
        this.profileForm.patchValue(JSON.parse(userData));
      }
    });
  }

  ionViewWillEnter() {
    this.userImage = '../../../../assets/img/user.png';
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
    val.value.profileId = this.userImage;
    if (this.phno) {
      const storeData = [{
        phoneNumber: this.phno,
        userDetails: val.value
      }];
      localStorage.setItem('storeUserData', JSON.stringify(storeData));
      this.alert.showToast('Your profile update successfully.', 'top', 5000);
      const data = {
        user_id: this.bs.userId,
      }
      this.bs.hitApi(
        'user/update-profile',
        data,
        'POST',
        true
      ).then((receivedData: any) => {
        if (receivedData.status) {
          this.router.navigate(['my-calendar']);

        }
      });
    } else {
      localStorage.setItem('userData', JSON.stringify(this.profileForm.value));
    }
    // console.log(val.value);
    this.navCtrl.navigateRoot('my-calendar');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  baseUrl: any = 'http://phoenixtechinfo.com/ekda/api/';
  token: any = '27ekda_auth';
  loadingElement: any;
  deviceToken: any = '';
  deviceType: any = '';
  userId: any = '';

  // userData
  mobileNo: any;
  firstName: any;
  lastName: any;
  middleName: any;
  dob: any;
  address: any;
  city: any;
  state: any;
  pincode: any;
  county: any = 'India';
  email: any;
  profilePic: any;
  constructor(
    public http: HTTP,
    public h: HttpClient,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public storage: Storage,
    public platform: Platform
  ) {

  }

  hitApi(method:string,api: string, params: {}) {
    // await this.http.post(
    //   this.baseUrl + api,
    //   params,
    //   { Auth: this.token }
    // ).then(receivedData => {
    //   this.DismissLoader();
    //   return JSON.parse(receivedData.data);
    // }).catch(error => {
    //   console.log('Error in plugin => ', error);
    //   this.DismissLoader();
    //   this.errorCall(error);
    // });

    if (method == 'get') {
      return this.h.get(this.baseUrl + api);
    } else if (method == 'post') {
      return this.h.post(this.baseUrl + api, params);
    } else if (method == 'delete') {
      return this.h.delete(this.baseUrl + api);
    }
  }

  getDeviceType() {
    if (this.platform.is('android')) {
      this.deviceType = 'Android'
    } else {
      this.deviceType = 'Ios'
    }
  }

  errorCall(error) {
    this.showToast(error.msg);
  }

  async showLoader() {
    this.loadingElement = await this.loadingCtrl.create({
      cssClass: 'custom-loader',
      spinner: 'circles'
    });

    return await this.loadingElement.present();
  }

  DismissLoader() {
    if (this.loadingElement) {
      this.loadingElement.dismiss();
    }

    // Multitple Loader not dismiss sometimes that's why this code can remove loader element from html if that not dismiss
    setTimeout(() => {
      $('.sc-ion-loading-ios-h').remove();
      $('.sc-ion-loading-md-h').remove();
    }, 1000);
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      mode: 'ios',
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  setUserData(data) {
    console.log('Received Data => ', data);
    this.storage.set('userData', data);
    this.mobileNo = data.phone_no;
    this.firstName = data.first_name;
    this.middleName = data.middle_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.address = data.address;
    this.dob = data.dob;
    this.token = data.access_token;
    this.city = data.city;
    this.state = data.state;
    this.county = data.county;
    this.pincode = data.pin_code;
    this.profilePic = data.profile_pic;
  }

  async getUserData() {
    return await this.storage.get('userData').then(data => {
      this.mobileNo = data.phone_no;
      this.firstName = data.first_name;
      this.middleName = data.middle_name;
      this.lastName = data.last_name;
      this.email = data.email;
      this.address = data.address;
      this.dob = data.dob;
      this.token = data.access_token;
      this.city = data.city;
      this.state = data.state;
      this.county = data.county;
      this.pincode = data.pin_code;
      this.profilePic = data.profile_pic;
    });
  }
}

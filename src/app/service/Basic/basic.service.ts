import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';
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
  constructor(
    public http: HTTP,
    public h: HttpClient,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public storage: Storage
  ) {

  }

  async hitApi(api, params: {}, method, loader) {
    if (loader) {
      this.showLoader();
    }
    await this.http.post(
      this.baseUrl + api,
      params,
      { Auth: this.token }
    ).then(receivedData => {
      console.log('Received Data => ', receivedData);
      this.DismissLoader();
      return JSON.parse(receivedData.data);
    }).catch(error => {
      console.log('Error in Api => ', error);
      this.DismissLoader();
      this.errorCall(error);
    });
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
    this.storage.set('userData', data);
  }

  getUserData(data) {
    return this.storage.get('userData');
  }
}

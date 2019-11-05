import { LoaderModule } from './../../Module/loader/loader.module';
import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from 'node_modules/@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage {
  public Data: any = [];
  public showSkeleton = false;
  constructor(
    public loader: LoaderModule,
    public router: Router,
    public modalCtrl: ModalController
  ) {
    this.showRegisterList();
  }

  showRegisterList() {
  }

  async viewDetails(val: any) {

  }
}

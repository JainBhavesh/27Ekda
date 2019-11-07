import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { BasicService } from 'src/app/service/Basic/basic.service';
@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.page.html',
  styleUrls: ['./my-calendar.page.scss']
})
export class MyCalendarPage {
  public filterData: boolean = false;
  public searchKey: any = '';
  public dummy: any = '';
  public userData: any;
  public filterSelectedData = {
    gender: '',
    pincode: '',
    city: ''
  }
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public bs: BasicService
  ) {
    this.menuCtrl.enable(true);
    this.getUserList();
  }

  getUserList() {
    try {
      this.bs.showLoader();
      const data = {
        user_id: localStorage.userID
      }
      this.bs.hitApi('post', 'user/user-list', data).subscribe((receivedData: any) => {
        this.userData = receivedData.data.user_list;
        this.bs.DismissLoader();
      }, error => {
        console.log('Error in userList => ', error);
        this.bs.DismissLoader();
      });
    } catch (error) {
      this.bs.DismissLoader();
    }
  }

  ionViewWillEnter() {
    this.dummy = this.userData;
  }

  filterPage() {
    this.filterData = !this.filterData;
    // this.navCtrl.navigateForward('filters');
  }

  profile(list: any) {
    this.navCtrl.navigateForward('contact-profile', {
      queryParams: {
        data: list
      }
    });
  }

  searchProduct(searchKey) {
    this.userData = this.userData.filter(d => d.fname.toLowerCase().includes(searchKey.toLowerCase()));
  }

  closeSearch() {
    this.searchKey = '';
    this.userData = this.dummy;
  }
}

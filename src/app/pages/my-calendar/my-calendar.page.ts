import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { BasicService } from 'src/app/service/Basic/basic.service';
@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.page.html',
  styleUrls: ['./my-calendar.page.scss']
})
export class MyCalendarPage {

  public searchKey: any = '';
  public dummy: any = '';
  public userData: any;
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public bs: BasicService
  ) {
    this.menuCtrl.enable(true);
    this.getUserList();
  }

  getUserList() {
    const data = {
      user_id: localStorage.userID
    }
    this.bs.hitApi('post', 'user/user-list', data).subscribe((receivedData: any) => {
      this.userData = receivedData.data.user_list;
    }, error => {
      console.log('Error in userList => ', error);
    });
  }

  ionViewWillEnter() {
    this.dummy = this.userData;
  }

  filterPage() {
    this.navCtrl.navigateForward('filters');
  }

  profile(list) {
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

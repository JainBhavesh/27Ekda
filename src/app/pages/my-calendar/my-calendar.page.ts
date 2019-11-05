import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.page.html',
  styleUrls: ['./my-calendar.page.scss']
})
export class MyCalendarPage {

  searchKey: any = '';
  dummy: any = '';
  userData: any = [{
    address: 'Jodhpur Cross Road',
    area: 'G.B',
    cno: '8690111111',
    dob: '1984-11-03T16:37:03.648+05:30',
    fname: 'Keyur',
    gender: 'male',
    lname: 'Jain',
    mail: 'keyur@gmail.com',
    mname: 'KamleshBhai',
    motherName: 'Ankita',
    pinCode: 384001,
    profileId: '../../../../assets/img/user1.jpg',
    suburbLists: 'Ahmedabad'
  },
  {
    address: 'Prenatirth derasar',
    area: 'G.B',
    cno: '9090909090',
    dob: '1984-11-03T16:37:03.648+05:30',
    fname: 'Ankit',
    gender: 'male',
    lname: 'Jain',
    mail: 'ankit@gmail.com',
    mname: 'Lalabhai',
    motherName: 'Sharmila',
    pinCode: 384001,
    profileId: '../../../../assets/img/user2.jpg',
    suburbLists: 'Ahmedabad'
  },
  {
    address: 'Ramdev nagar',
    area: 'G.B',
    cno: '8080808080',
    dob: '1984-11-03T16:37:03.648+05:30',
    fname: 'Pradip',
    gender: 'male',
    lname: 'Jain',
    mail: 'pradip@gmail.com',
    mname: 'RaviBhai',
    motherName: 'Susmita',
    pinCode: 384001,
    profileId: '../../../../assets/img/user3.jpg',
    suburbLists: 'Ahmedabad'
  },
  {
    address: 'Iskon cross Road',
    area: 'G.B',
    cno: '7070707070',
    dob: '1984-11-03T16:37:03.648+05:30',
    fname: 'Jayesh',
    gender: 'male',
    lname: 'Jain',
    mail: 'jayesh@gmail.com',
    mname: 'RajivBhai',
    motherName: 'namrata',
    pinCode: 384001,
    profileId: '../../../../assets/img/user4.jpg',
    suburbLists: 'Ahmedabad'
  }
  ];
  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController
  ) {
    this.menuCtrl.enable(true);
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

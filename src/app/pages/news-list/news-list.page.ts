import { Component, OnInit } from '@angular/core';
import { BasicService } from 'src/app/service/Basic/basic.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.page.html',
  styleUrls: ['./news-list.page.scss'],
})
export class NewsListPage {

  newsData: any = [
    {
      title: 'Abc',
      discription: 'dummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy text'
    },
    {
      title: 'def',
      discription: 'dummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy text'
    },
    {
      title: 'ghi',
      discription: 'dummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy text'
    },
    {
      title: 'jkl',
      discription: 'dummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy textdummy text'
    }
  ];

  constructor(
    public bs: BasicService,
    public navCtrl: NavController
  ) {

  }

  getNewsData() {
    const data = {
      user_id: this.bs.userId
    }
    this.bs.hitApi(
      'user/donor-list',
      data,
      'POST',
      true
    ).then((receivedData: any) => {
      if (receivedData.status) {
        this.newsData = receivedData.data.news_lists;
      } else {
        // clear user storage Or logout forcefully
      }
    }).catch(e => console.log('Error => ', e));
  }

  openNewsDetail(detail) {
    this.navCtrl.navigateForward('news-list-detail-page', {
      queryParams: {
        data: detail
      }
    })
  }
}

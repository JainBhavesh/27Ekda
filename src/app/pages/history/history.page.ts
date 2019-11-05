import { AlertModule } from './../../Module/alert/alert.module';
import { ActionSheetModule } from './../../Module/action-sheet/action-sheet.module';
import { Component } from '@angular/core';
import { LoaderModule } from '../../Module/loader/loader.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
})
export class HistoryPage {
  public historyOfAppointment: any = [];
  public showSkeleton = false;
  constructor(
   public loader: LoaderModule,
    public router: Router,
    public actionSheet: ActionSheetModule,
    public toast: AlertModule
  ) {}

  ionViewWillEnter() {

  }
}

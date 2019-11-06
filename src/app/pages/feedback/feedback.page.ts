import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage {

  name: any = '';
  mobileNo: any = '';
  feedback: any = '';
  constructor() {
    this.name = 'Bhavesh';
    this.mobileNo = '8690111115';
  }

  submit() {
    console.log('name => ', this.name, '<= mobile no => ', this.mobileNo, '<= Feedback => ', this.feedback);
  }
}

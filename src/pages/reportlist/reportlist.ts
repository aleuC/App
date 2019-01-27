import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-reportlist',
  templateUrl: 'reportlist.html',
})
export class ReportlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}

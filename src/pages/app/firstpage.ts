import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReportPage } from '../report/report';
import { ReportlistPage } from '../reportlist/reportlist';

@Component({
  selector: 'page-first',
  templateUrl: 'firstpage.html'
})
export class FirstPage {

  constructor(public navCtrl: NavController) {


  }
  createReport(){
    this.navCtrl.push(ReportPage);

  }

  viewReports() {
    this.navCtrl.push(ReportlistPage);
  }



}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{ ReportPage } from '../report/report'

@Component({
  selector: 'page-first',
  templateUrl: 'firstpage.html'
})
export class FirstPage {

  constructor(public navCtrl: NavController) {


  }
  openPage(){
    this.navCtrl.push(ReportPage);

  }



}

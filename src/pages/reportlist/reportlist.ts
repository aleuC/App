import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ReportShowPage} from "../reportshow/reportshow";

@Component({

  template: `<ion-card ion-card [navPush]="pushPage" [navParams]="params">Go</ion-card>`,
  selector: 'page-reportlist',
  templateUrl: 'reportlist.html',
})
export class ReportlistPage {

   ar = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {

    this.createList();
  }

  ionViewWillEnter(){
    this.createList();
  }

  createList(){
    this.storage.forEach( (value, key, index) => {
      console.log("This is the value", value)
      console.log("from the key", key)
      console.log("Index is", index)

      this.ar.push(value);
    })
  }

  viewReport(param) {
    console.log('param:',param)
    this.navCtrl.push(ReportShowPage,{param:param});
  }


}

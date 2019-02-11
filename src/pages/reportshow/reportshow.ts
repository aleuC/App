import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-reportshow',
  templateUrl: 'reportshow.html',
})

export class ReportShowPage{


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    console.log("aaaaaaaaaaaaaaaaaay: "+Date.parse(navParams.get("param")))

  }

}

import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-reportlist',
  templateUrl: 'reportlist.html',
})
export class ReportlistPage {

   ar = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public alertCtrl: AlertController) {

    this.createList();
  }

  createList(){
    this.storage.forEach( (value, key, index) => {
      console.log("This is the value", value)
      console.log("from the key", key)
      console.log("Index is", index)

      value.timestamp=new Date(value.timestamp).toLocaleDateString();
      this.ar.push(value);
    })
  }

}

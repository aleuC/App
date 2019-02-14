import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-reportshow',
  templateUrl: 'reportshow.html',
})

export class ReportShowPage{

  private param;
  private image:string;
  private description:string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    console.log("aaaaaaaaaaaaaaaaaay: "+navParams.get("param"));
    this.param=navParams.get("param");


    this.storage.get(this.param).then((val)=> {

      this.image=val.image;
      this.description=val.description;



      document.getElementById('picture').setAttribute('src', this.image);



    });

  }

}

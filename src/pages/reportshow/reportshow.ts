import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'page-reportshow',
  templateUrl: 'reportshow.html',
})

export class ReportShowPage{

  private param;
  private image:string;
  description=new String();


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,private iab:InAppBrowser) {
    console.log("aaaaaaaaaaaaaaaaaay: "+navParams.get("param"));
    this.param=navParams.get("param");


    this.storage.get(this.param).then((val)=> {

      this.image=val.image;
      this.description=val.description;
      console.log("oi:"+this.description)



      document.getElementById('picture').setAttribute('src', this.image);

      const browser = this.iab.create('https://www.techiediaries.com','_self',{location:'no'});

      console.log("boi:"+this.description)

    });

  }

}

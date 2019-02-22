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
  private location:string;
  description=new String();


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,private iab:InAppBrowser) {
    this.param=navParams.get("param");


    this.storage.get(this.param).then((val)=> {

      this.image=val.image;
      this.description=val.description;
      this.location = val.coordinates;

      document.getElementById('picture').setAttribute('src', this.image);

    });

  }

  showPosition(){
    const browser = this.iab.create('http://www.google.com/maps/place/'+this.location,'_blank',{location:'no'});
  }

  deleteReport(){
    this.storage.remove(this.param);
    this.navCtrl.popToRoot();
  }

}

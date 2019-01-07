import { Component } from '@angular/core';
import {NavController, AlertController, DateTime} from 'ionic-angular';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {Geolocation} from "@ionic-native/geolocation";

@Component({
  selector: 'page-report',
  providers: [Camera],
  templateUrl: 'report.html'
})
export class ReportPage {

  private image: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,private camera: Camera,private androidPermissions: AndroidPermissions,private geolocation:Geolocation,private storage: Storage) {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

  }

  submitReport(){

   let date = new Date().getDate();

    let your_json_object = {"val":date};

    // set a key/value
    this.storage.set('date', your_json_object);

    // to get a key/value pair
    this.storage.get('date').then((val) => {
      console.log('Your json is', val);
    });

  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {

      resp.coords.latitude;

      let alert = this.alertCtrl.create({
        title: 'location',
        subTitle: 'coordinates',
        message:resp.coords.latitude.toString(),
        buttons: ['OK']
      });
      alert.present();

      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onTakePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      saveToPhotoAlbum: true,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.displayErrorAlert(err);
    });
  }

  displayErrorAlert(err){
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error while trying to capture picture',
      buttons: ['OK']
    });
    alert.present();
  }




}

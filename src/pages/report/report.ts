import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import {AndroidPermissions} from "@ionic-native/android-permissions";
@Component({
  selector: 'page-report',
  providers: [Camera],
  templateUrl: 'report.html'
})
export class ReportPage {

  private image: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,private camera: Camera,private androidPermissions: AndroidPermissions) {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

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

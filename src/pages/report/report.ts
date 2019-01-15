import { Component } from '@angular/core';
import {NavController, AlertController, DateTime} from 'ionic-angular';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import {AndroidPermissions} from "@ionic-native/android-permissions";
import {Geolocation} from "@ionic-native/geolocation";
import { Storage } from '@ionic/storage';
import {MediaCapture, MediaFile, CaptureError, CaptureImageOptions} from "@ionic-native/media-capture";
import { File } from '@ionic-native/file';
import { NativeAudio} from "@ionic-native/native-audio";
import { Toast } from "@ionic-native/toast";

@Component({
  selector: 'page-report',
  providers: [Camera],
  templateUrl: 'report.html'
})
export class ReportPage {

  private image: string;
  private audio: string;
  private text: string;
  private audioLocation:string ;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private camera: Camera, private androidPermissions: AndroidPermissions, private geolocation: Geolocation, private storage: Storage, private mediaCapture: MediaCapture, private file: File,private nativeAudio:NativeAudio,private toast:Toast) {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

  }

  play(){

    this.nativeAudio.preloadSimple('uniqueId1', 'storage/emulated/0/Voice%20Recorder/Voce%20037.m4a' );
    this.nativeAudio.play('uniqueId1', () => this.toast.show("ciao","long","center")).then();



  }

  recordAudio() {

    var your_json_object = {};

    this.mediaCapture.captureAudio().then(
      (data: MediaFile[]) => {
        (this.audioLocation = data[0].fullPath)
        console.log(this.audioLocation);

        this.nativeAudio.preloadSimple('uniqueId1', this.audioLocation.replace(/^file:/, ''));
        this.nativeAudio.play('uniqueId1');



      },
      (err: CaptureError) => console.error("this is so sad")
    );


    //console.log("bubu"+your_json_object.name);

    // set a key/value
    this.storage.set('my-json', your_json_object);

    // to get a key/value pair
    this.storage.get('my-json').then((val) => {
      console.log('Your json is', val.name);
    });


  }

  submitReport() {

    let date = new Date().getDate();

    let your_json_object = {"name": "John"};

    // set a key/value
    this.storage.set('my-json', your_json_object);

    // to get a key/value pair
    this.storage.get('my-json').then((val) => {
      console.log('Your json is', val.name);
    });

  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      resp.coords.latitude;

      let alert = this.alertCtrl.create({
        title: 'location',
        subTitle: 'coordinates',
        message: resp.coords.latitude.toString(),
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

    /*const options: CaptureImageOptions = {
      limit: 1
    }*/

    var imageLocation;

    /*this.mediaCapture.captureImage(options).then((res: MediaFile[]) => {
        let capturedFile = res[0];
        let fileName = capturedFile.name;
        let dir = capturedFile['localURL'].split('/');
        dir.pop();
        let fromDirectory = dir.join('/');
        var toDirectory = this.file.dataDirectory;

        imageLocation = toDirectory + fileName;
        console.log('image_location: ', capturedFile.fullPath);

        //this.file.readAsDataURL(toDirectory, fileName).then(res=> console.log('immagine gbbg: ', res)  );



        let realPath = imageLocation.replace(/^file:\/\//, '');
        //realPath = imageLocation.replace(/\/, '\');

        console.log('image_location_dir: ', realPath);

        this.image =realPath;

        this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then((res) => {
          //this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
          //console.log('image_location: ', toDirectory + fileName);

        }, err => {
          console.log('err: ', err.toString());
        });
      },
      (err: CaptureError) => console.error(err));*/


    //console.log('image', imageLocation);


    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE

    }

    this.camera.getPicture(options).then((imageData) => {
      //this.image = 'data:image/jpeg;base64,' + imageData;


      let realPath = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      //let realPath = imageData.replace(/^file:\/\//, '');

      this.image = realPath;
      console.log(realPath);

    }, (err) => {
      this.displayErrorAlert(err);
    });
  }

  displayErrorAlert(err) {
    console.log(err);
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Error while trying to capture picture',
      buttons: ['OK']
    });
    alert.present();
  }
}


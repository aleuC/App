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
import {Media, MediaObject} from "@ionic-native/media";
import {FirstPage} from '../app/firstpage';
import log from "@ionic/pro/dist/src/services/monitoring/log";
import {ReportlistPage} from "../reportlist/reportlist";

@Component({
  selector: 'page-report',
  providers: [Camera],
  templateUrl: 'report.html'
})
export class ReportPage {

  description:string;

  private image: string;
  private audio: string;
  private location:string;
  private audioLocation:string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private camera: Camera, private androidPermissions: AndroidPermissions, private geolocation: Geolocation, private storage: Storage, private mediaCapture: MediaCapture, private file: File,private nativeAudio:NativeAudio,private toast:Toast,private media:Media) {

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

    //chiamo la funzione nel costruttore per dare il tempo al gps di ottenere un fix
    this.getLocation();

  }

  wait(ms){
    let start = new Date().getTime();
    let end = start;
    while(end<start+ms){
      end = new Date().getTime();
    }
  }

  returnToHome(){
    this.wait(1000);
    this.navCtrl.pop();
  }

  play(){

    /*this.nativeAudio.preloadSimple('uniqueId1', 'storage/emulated/0/Voice%20Recorder/Voce%20037.m4a' );
    this.nativeAudio.play('uniqueId1', () => this.toast.show("ciao","long","center")).then();*/

  }

  //non funzionante
  recordAudio() {

    var your_json_object = {};

    this.mediaCapture.captureAudio().then(
      (data: MediaFile[]) => {

        let capturedFile = data[0];
        let fileName = capturedFile.name;
        let dir = capturedFile['localURL'].split('/');
        dir.pop();
        let fromDirectory = dir.join('/');
        var toDirectory = this.file.dataDirectory;
        this.toast.show("aaaaaaaaaaaaaaaaa","long","center");

        let dwoakda = this.alertCtrl.create({
          title: 'directory',
          subTitle: 'path',
          message: data[0].fullPath,
          buttons: ['OK']
        });
        dwoakda.present();

        const audioFile: MediaObject = this.media.create("");

        console.log(audioFile.getDuration());
       // audioFile.play();

        //this.audioLocation = data[0].fullPath;
        console.log(data[0].fullPath);

        /*this.nativeAudio.preloadSimple('uniqueId1', this.audioLocation.replace(/^file:/, ''));
        this.nativeAudio.play('uniqueId1');*/



      },
      (err: CaptureError) => console.error("this is so sad")
    );


    //console.log("bubu"+your_json_object.name);

    // set a key/value
    /*this.storage.set('my-json', your_json_object);

    // to get a key/value pair
    this.storage.get('my-json').then((val) => {
      console.log('Your json is', val.name);
    });*/

    /*const file: MediaObject = this.media.create('file.mp3');

    file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

    file.onSuccess.subscribe(() => console.log('Action is successful'));

    file.onError.subscribe(error => console.log('Error!', error));

    file.startRecord();

    file.play();

    file.release();

    console.log("finito :)")*/


    /*window.requestFileSystem  (loc, function(d) {
      window.resolveLocalFileSystemURL($scope.sound.file, function(fe) {
        fe.copyTo(d, filename, function(e) {
          console.log('success inc opy');
          console.dir(e);
          scope.sound.file = e.nativeURL;
          $scope.sound.path = e.fullPath;

          Sounds.save($scope.sound).then(function() {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go("home");
          });

        }, function(e) {
          console.log('error in coipy');console.dir(e);
        });
      }, function(e) {
        console.log("error in inner bullcrap");
        console.dir(e);
      });*/


  }

  submitReport() {

    let cords=this.location;

    let date = new Date();
    console.log(date);

    let reportTimeStamp= date.getTime();
    let localeDate = date.toLocaleDateString();

    let your_json_object = {"coordinates": cords,"image": this.image,"description":this.description,"timestamp":reportTimeStamp,"localeDate":localeDate};

    // set a key/value
    this.storage.set(date.getTime().toString(), your_json_object);

    console.log(cords);

    this.returnToHome();

  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.location=resp.coords.latitude.toString()+","+resp.coords.longitude.toString();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onTakePicture() {

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
      document.getElementById('picture').setAttribute('src', this.image);

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


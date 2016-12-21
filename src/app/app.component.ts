import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';
import { LocationPage } from '../pages/location/location';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  public rootPage: any;

  constructor(public platform: Platform) {


    platform.ready().then(() => {

      this.setStatusBar();

      this.hideSplashScreen();


      NativeStorage.getItem('state').then(data => {

        this.rootPage = TabsPage;
      },
        error => {
          console.log(error);


          this.rootPage = LocationPage;
        });






      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  setStatusBar() {

       StatusBar.overlaysWebView(true); // let status bar overlay webview
     StatusBar.backgroundColorByHexString('#054160'); // set status bar to white
     
    } 


  hideSplashScreen() {

    if (Splashscreen) {
      setTimeout(() => {
        // alert("Vou esconder Splashscreen");
        Splashscreen.hide();
      }, 500);
    }
  }
}
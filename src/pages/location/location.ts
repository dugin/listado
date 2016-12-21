import { Component } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { LocationService } from '../../providers/location-service';
import { LoadingController, Loading } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { NativeStorage } from 'ionic-native';
import { PermissionsUtil } from '../../util/permissions-util';

@Component({
  selector: 'location',
  templateUrl: 'location.html',

})
export class LocationPage {


  loader: Loading;
  estado: string;
  loading: boolean;
  next: boolean;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public viewCtrl: ViewController, public locationService: LocationService,
    public loadingCtrl: LoadingController) {
    console.log("LocationPage constructor ");



  }


  onChange(changes) {

    this.next = changes != null;


  }


  setMyLocation() {

    this.estado = "";

    this.next = false;


    PermissionsUtil.checkLocationPermission().then(permissionType => {

      this.setMessage(permissionType);

      this.locationService.getMyLocation().then(city => {
        this.loading = false;
        this.next = true;

        this.estado = city;

      }
      ).catch(error => {

        console.log(error);

      });
    })

  }


  nextPage() {
     this.navCtrl.setRoot(TabsPage, {
        city: this.estado
      });


    PermissionsUtil.checkContactPermission().then(permissionType => {


      this.setMessage(permissionType);

      this.loading = false;
      this.persistMyState();


      this.navCtrl.setRoot(TabsPage, {
        city: this.estado
      });

    });
  }

  persistMyState() {
    NativeStorage.setItem('state', { property: this.estado })
      .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
      );

  }

  setMessage(messageType: number) {

    switch (messageType) {
      case PermissionsUtil.LOCATION_DISABLED:
        this.showAlert("Localização", "Necessitamos do GPS habilidado para obter a sua localização.", PermissionsUtil.LOCATION_DISABLED);
        break;

      case PermissionsUtil.LOCATION_UNAUTHORIZED:
        this.showAlert("Localização", "Necessitamos da sua autorização para obter a sua localização.", PermissionsUtil.LOCATION_UNAUTHORIZED);
        break;

      case PermissionsUtil.CONTACT_UNAUTHORIZED:
        this.showAlert("Contatos", "Necessitamos da sua autorização para organizar seus contatos.", PermissionsUtil.LOCATION_UNAUTHORIZED);
        break;

      default:
        this.loading = true;
        return;


    }


  }

  showAlert(title: string, text: string, permissionType: number) {



    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [{
        text: 'OK',
        handler: data => {
          PermissionsUtil.redirectUser(permissionType);
          if (permissionType != PermissionsUtil.CONTACT_UNAUTHORIZED)
            setTimeout(() => {
              this.loading = true;
            }, 1000);


        }
      }]
    });
    alert.present();
  }






}

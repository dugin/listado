import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Contact, Clipboard, SocialSharing, CallNumber } from 'ionic-native';
import {WhatsappNumberUtil} from '../../util/whatsapp-number-util'


/*
  Generated class for the DetailsContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
   selector: 'details-contacts',
  templateUrl: 'details-contacts.html',
})
export class DetailsContactsPage {

  contact : Contact;
 

  constructor( public toastCtrl: ToastController, public navCtrl: NavController, public navParams :NavParams, public platform: Platform) {

    this.contact =  this.navParams.get('contact');

  }

  sendViaWhatsapp(number: string, contact: Contact){
    
    
   let tel ;

    if (this.platform.is('ios'))
        tel = contact.id;

else{
  tel  = WhatsappNumberUtil.transformNumber(number);
   

 
   
} 

   if(tel.localeCompare('excessao') == 0 )
        alert(number);

   else
    SocialSharing.shareViaWhatsAppToReceiver(tel,"",null, null).then((d) =>{

      console.log("then: "+d);
      

    }).catch( (err) =>{

      console.log("err: "+ err);
      
    });

  }

  callNumber(number: string){

      CallNumber.callNumber(number, true).then(success =>{

      console.log('Launched dialer! - '+success);

    }), (error=>{
      console.log('Error launching dialer - '+ error)

    });
  

  }

  copyToClipboard(number: string){

    Clipboard.copy(number).then (success =>{

            this.presentToast(number);
    });


  }

  presentToast(number: string) {
    let toast = this.toastCtrl.create({
      message: 'Número '+ number + ' copiado!',
      duration: 3000
    });
    toast.present();
  }


}

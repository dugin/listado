import { Component } from '@angular/core';
import { NavController, PopoverController, Tabs  } from 'ionic-angular';
import {OptionsPage} from '../options/options';
import {ContactsService} from '../../providers/contacts-service';
import { Contact } from 'ionic-native';
import {DetailsContactsPage} from '../details-contacts/details-contacts';
import {DomSanitizer} from '@angular/platform-browser';
/*
  Generated class for the LastContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'last-contacts',
  templateUrl: 'last-contacts.html'

})
export class LastContactsPage {

lastContacts :Contact[];

  constructor( public sanitizer:DomSanitizer, public contactsService : ContactsService,public tabs: Tabs,  public popoverCtrl: PopoverController, public navCtrl: NavController) {

    console.log("LastContactsPage constructor");
    
    
   
    this.contactsService.getlastContacts().then ( data =>{

          this.lastContacts = data;

    })
   
  }

   ionViewDidLeave (){
     console.log("ionViewDidLeave");
     

      this.tabs.previousTab(true);
  }

   getImgSanatized (contact : Contact) : any{
     

        if(contact.photos != null){
        let photo = contact.photos[0].value;
       
         return  this.sanitizer.bypassSecurityTrustUrl(photo);
        }

        return 'assets/images/person_avatar.png';

     
  }

  selectContact(contact : Contact) {

   

    this.navCtrl.push(DetailsContactsPage, {
      contact: contact
        });

  }



presentOptions(myEvent) {
    let popover = this.popoverCtrl.create(OptionsPage);
    popover.present({

       ev: myEvent
    });
    
  }
  
}

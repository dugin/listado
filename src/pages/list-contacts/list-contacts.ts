import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, Content, ViewController, PopoverController } from 'ionic-angular';
import { Contact, NativeStorage } from 'ionic-native';
import { ContactsService } from '../../providers/contacts-service';
import { State } from '../../interface/state-interface';
import { OptionsPage } from '../options/options';
import { DetailsContactsPage } from '../details-contacts/details-contacts';
import { DomSanitizer } from '@angular/platform-browser';
import { StateUtil } from '../../util/state-util';
import { StateModel } from '../../model/state-model'
import { ContactModel } from '../../model/contact-model'
import _ from "lodash";

/*
  Generated class for the ListContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'list-contacts',
  templateUrl: 'list-contacts.html',

})
export class ListContactsPage {
  @ViewChild(Content) content: Content;


  loading: boolean;
  noContact: boolean = false;
  groupedContacts = [];
  alphabet: Promise<string[]>;
  list_index_margin: any;
  isIOS: boolean = this.platform.is('ios');
  list_index_visibility: any;
  itensCount = new Array<number>();

  stateSelector;

  contacts = new Array<ContactModel>();
  contactsTemp = new Array<ContactModel>();
  contactsMap = new Map<string, ContactModel[]>();


  constructor(public sanitizer: DomSanitizer,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public contactsService: ContactsService,
    public navParams: NavParams) {


    this.loading = true;
    this.list_index_visibility = 'hidden';





    if (navParams.get('city') != null)
      this.arrangeContacts(navParams.get('city'));


    else {
      console.log('ListContactsPage else!! ');

      NativeStorage.getItem('state').then(
        data => {

          console.log('ListContactsPage: ' + data.state);

          this.arrangeContacts(new StateModel(data.state, data.state_short));
        },

        error => { console.error('Nao é pra dar erro aqui: ' + error) }
      );
    }
  }

  arrangeContacts(myState: StateModel) {

    this.contactsService.arrangeContacts(myState).then((contactStruct: { [key: string]: ContactModel[]; }) => {

      this.groupContacts(contactStruct);
      this.enableLastContactTab()
    })

  }


  onChange(event: string) {

    console.log(event);


    if (event.localeCompare('TODOS') == 0)
      this.resetContacts();

    else if (event.localeCompare('OUTROS PAÍSES') == 0)

      this.contacts =_.cloneDeep(this.contactsMap.get('##'));



    else
      this.contacts = _.cloneDeep( this.contactsMap.get(event));






  }

  private resetContacts() {

    this.contacts = _.cloneDeep(this.contactsTemp);


  }


  enableLastContactTab() {

    this.navCtrl.parent.getByIndex(1).enabled = 'true';

  }



  getImgSanatized(contact: Contact): any {


    if (contact.photos != null) {
      let photo = contact.photos[0].value;

      return this.sanitizer.bypassSecurityTrustUrl(photo);
    }

    return 'assets/icon/contact_icon.svg';


  }

  selectContact(contact: Contact) {

    this.navCtrl.push(DetailsContactsPage, {
      contact: contact

    });

  }

  groupContacts(contactStruct: { [key: string]: ContactModel[]; }) {



    let arr = new Array<string>();



    if (Object.keys(contactStruct).length === 0)
      this.noContact = true;

    else

      for (var state in State) {

        var isValueProperty = parseInt(state, 10) >= 0

        if (isValueProperty) {

          if (contactStruct[State[state]] != null) {

            if (State[state].localeCompare('##') == 0)
              arr.push('OUTROS PAÍSES');
            else
              arr.push(State[state]);


            let sortedContacts = contactStruct[State[state]].sort((a: ContactModel, b: ContactModel) => {
              if (a.contact.name != null && b.contact.name != null)
                if (a.contact.name.formatted != null && b.contact.name.formatted != null)
                  return a.contact.name.formatted.localeCompare(b.contact.name.formatted);

              return -1;

            });

            this.contactsTemp  = this.contactsTemp.concat(sortedContacts);
            this.contacts = this.contacts.concat(sortedContacts);

            this.resetContacts();

            this.contactsMap.set(State[state], sortedContacts)

          }


        };
      }

    arr.unshift('TODOS')

    this.alphabet = Promise.resolve(arr);

    this.loading = false;




  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.resetContacts();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.contacts = this.contacts.filter((item) => {
        return (item.contact.name.formatted.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  myHeaderFn(record: ContactModel, recordIndex: number, records: ContactModel[]) {

    if (records != null) {
      if (records.length > 0) {

        if (recordIndex == 0)
          return records[0].state.state;

        else
          return records[recordIndex - 1].state.state.localeCompare(records[recordIndex].state.state) != 0 ? records[recordIndex].state.state : null;



      }
    }



    return null;
  }




  presentOptions(myEvent) {
    let popover = this.popoverCtrl.create(OptionsPage, { viewCtrl: this.viewCtrl });
    popover.present({

      ev: myEvent

    });

  }

}

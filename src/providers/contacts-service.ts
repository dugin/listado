import { Injectable } from '@angular/core';
import { Contacts, Contact, ContactFieldType } from 'ionic-native';
import { CityToStateUtil } from '../util/city-to-state-util';
import {StateModel} from '../model/state-model';
import {ContactModel} from '../model/contact-model';



@Injectable()
export class ContactsService {

  private static lstFiveCts: Promise<Contact[]>;

  constructor() { }



  arrangeContacts(estado: StateModel): Promise<{ [key: string]: ContactModel[]; }> {

  

    return new Promise((resolve, reject) => {

     var filter :ContactFieldType[] = ["displayName", "addresses", "phoneNumbers"];

      Contacts.find(filter).then((contacts: Contact[]) => {

        ContactsService.lstFiveCts = Promise.resolve(this.setLastContacts(contacts, 10));


        CityToStateUtil.rearrangeTelephoneNumbers(contacts, estado);

        resolve(CityToStateUtil.contactsStruct);



      })


    })

  }

  private setLastContacts(contacts: Contact[], qtdContacts: number): Contact[] {


    let arr = new Array<Contact>();

    for (let i = contacts.length - 1; i > -1; i--) {

      if (contacts[i] != null)
        if (contacts[i].name != null && contacts[i].phoneNumbers != null)
          if (contacts[i].name.formatted.length != 0 && contacts[i].phoneNumbers.length != 0) {
            arr.push(contacts[i]);
          }

      if (arr.length == qtdContacts)
        break;
    }

    return arr;


  }
  getlastContacts(): Promise<Contact[]> {

    return ContactsService.lstFiveCts;

  }



}

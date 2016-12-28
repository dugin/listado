import { Contact } from 'ionic-native';
import {StateUtil} from './state-util';
import {ContactModel} from '../model/contact-model';
import {StateModel} from '../model/state-model'

export class CityToStateUtil {

  static contactsStruct: { 
    [key: string]: ContactModel[]; 
  } = {};



  public static rearrangeTelephoneNumbers(contact: Contact[], myState: StateModel) {
    CityToStateUtil.contactsStruct = {};

    let resp: StateModel;

    for (let i = 0; i < contact.length; i++) {


      if (contact[i].phoneNumbers != null) {

        for (let j = 0; j < contact[i].phoneNumbers.length; j++) {

         let tel = contact[i].phoneNumbers[j].value.replace(/[^\d+]/g, '');

          

          if (tel.length >= 8) {

            if (tel.indexOf('+') > -1) {

              if (tel.substr(tel.indexOf('+') + 1, 2).localeCompare('55') == 0) {

                if (tel.charAt(tel.indexOf('+') + 3) == '0') {

                  if (tel.length > 15) {
                    // Ex: +5502121 xxxxx-xxxx
                    resp = StateUtil.findStateFromTelephoneNumber(tel.substr(tel.indexOf('+') + 6, 2));


                    this.initializeArray(contact[i], resp);
                    break;

                  }
                  else {
                    // Ex: +55021 xxxxx-xxxx
                    resp = StateUtil.findStateFromTelephoneNumber(tel.substr(tel.indexOf('+') + 4, 2));

                    this.initializeArray(contact[i], resp);
                    break;
                  }

                }


                else if (tel.length == 11 || tel.length == 12) {

                  // Ex: +55 xxxxx-xxxx
                  this.initializeArray(contact[i], myState);
                  break;
                }

                else {
                  // Ex: +5521 xxxxx-xxxx
                  resp = StateUtil.findStateFromTelephoneNumber(tel.substr(tel.indexOf('+') + 3, 2));

                  this.initializeArray(contact[i], resp);
                  break;



                }


              }
              else {
                // gringa
                this.initializeArray(contact[i], CityToStateUtil.setOtherCountries());
                break;

              }
            }

            else if (tel.charAt(0) == '0') {

              if (tel.substr(0, 2).localeCompare("00") == 0) {

                // Ex: 0047... gringa
                this.initializeArray(contact[i],  CityToStateUtil.setOtherCountries());
                break;

              }
              else if (tel.length > 12) {

                // Ex: 02121 xxxxx-xxxx
                resp = StateUtil.findStateFromTelephoneNumber(tel.substr(3, 2));

                this.initializeArray(contact[i], resp);
                break;

              }
              else {
                // Ex: 021 xxxxx-xxxx
                resp = StateUtil.findStateFromTelephoneNumber(tel.substr(1, 2));

                this.initializeArray(contact[i], resp);
                break;

              }
            }
            else if (tel.length == 8 || tel.length == 9) {

              // Ex: xxxxx-xxxx

              this.initializeArray(contact[i], myState);
              break;



            }
            else if (tel.length == 10 || tel.length == 11) {

              // Ex: 21 xxxxx-xxxx
              resp = StateUtil.findStateFromTelephoneNumber(tel.substr(0, 2));


              this.initializeArray(contact[i], resp);
              break;


            }

            else {

              // o que sobrar é gringo
              this.initializeArray(contact[i], CityToStateUtil.setOtherCountries() );

              break;

            }

          }
        }
      }
    }

  }


  private static setOtherCountries(): StateModel{
    return new StateModel('Outros Países','##');

  }

  private static initializeArray(c: Contact, est: StateModel) {

    

    if (CityToStateUtil.contactsStruct[est.state_short] == null) 
      CityToStateUtil.contactsStruct[est.state_short] = new Array<ContactModel>();
    
      CityToStateUtil.contactsStruct[est.state_short].push(new ContactModel( c, est));
    

  }








}

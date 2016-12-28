import { Contacts, Contact, ContactFieldType } from 'ionic-native';
import {StateModel} from './state-model'

export class ContactModel {


    constructor(
        public contact: Contact,
        public state: StateModel

    ){}
}
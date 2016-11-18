import {Component} from '@angular/core';
import {ListContactsPage} from '../list-contacts/list-contacts';
import {LastContactsPage} from '../last-contacts/last-contacts';

import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  
  cityParam = {city: null};

  constructor(params: NavParams) {

    this.cityParam.city = params.get('city');
      
      
    
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = ListContactsPage;
    this.tab2Root = LastContactsPage;
    
  }
}

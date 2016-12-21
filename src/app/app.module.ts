import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { DetailsContactsPage } from '../pages/details-contacts/details-contacts';
import { LastContactsPage } from '../pages/last-contacts/last-contacts';
import { ListContactsPage } from '../pages/list-contacts/list-contacts';
import { TabsPage } from '../pages/tabs/tabs';
import { LocationPage } from '../pages/location/location';
import { OptionsPage } from '../pages/options/options';
import {ContactsService } from '../providers/contacts-service';
import {LocationService } from '../providers/location-service';
import {HammerGesturesDirective} from '../directives/gesture'

@NgModule({
  declarations: [
    MyApp,
    LastContactsPage,
    ListContactsPage,
    LocationPage,
    TabsPage,
    OptionsPage,
    DetailsContactsPage,
    HammerGesturesDirective
    
  ],
  imports: [
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages:"true", platforms: {
    android: {
      tabsPlacement: 'bottom'
    },
    ios: {
      tabsPlacement: 'bottom',
      statusbarPadding: true
    }
}
})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LastContactsPage,
    ListContactsPage,
    LocationPage,
    TabsPage,
    OptionsPage,
    DetailsContactsPage
  ],
  providers: [LocationService, ContactsService ]
})
export class AppModule {}

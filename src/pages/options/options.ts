import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { LocationPage } from '../location/location';


/*
  Generated class for the OptionsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  constructor(public navCtrl: NavController, 
  public viewCtrl: ViewController,
   public navParams :NavParams) {


   
   

  }

  changeState() {

  
     console.log('Active: '+this.navCtrl.getActive().component);
      let a : ViewController;
      for( a  of this.navCtrl.getViews())
        console.log("Views: "+a.component);
        
  this.navCtrl.removeView(this.navParams.get('navCtrl'));
    
    
   console.log("First:"+this.navCtrl.first().component);
 

  this.navCtrl.setRoot(LocationPage).then(()=>{

 
  });
  
   
  }

 

}

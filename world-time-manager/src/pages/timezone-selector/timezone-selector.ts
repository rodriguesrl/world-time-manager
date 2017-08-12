import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment-timezone';

@Component({
  selector: 'page-timezone-selector',
  templateUrl: 'timezone-selector.html',
})
export class TimezoneSelectorPage {
  zones = moment.tz.names();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
